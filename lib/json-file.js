import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

export function createJsonStore(file, label) {
  let queue = Promise.resolve();

  async function readData() {
    let content;

    try {
      content = await fs.readFile(file, "utf8");
    } catch (error) {
      if (error && error.code === "ENOENT") {
        return { data: [] };
      }

      return {
        failure: `We could not read the existing ${label}. Please try again later.`,
      };
    }

    try {
      const parsed = JSON.parse(content);

      if (!Array.isArray(parsed)) {
        return {
          failure: `The ${label} file is damaged. Nothing was saved, and the file was left unchanged.`,
        };
      }

      return { data: parsed };
    } catch {
      return {
        failure: `The ${label} file is damaged. Nothing was saved, and the file was left unchanged.`,
      };
    }
  }

  async function writeData(data) {
    const tempFile = `${file}.${process.pid}.${randomBytes(4).toString("hex")}.tmp`;

    try {
      await fs.writeFile(tempFile, JSON.stringify(data, null, 2));
      await fs.rename(tempFile, file);
      return { ok: true };
    } catch {
      await fs.unlink(tempFile).catch(() => null);
      return { ok: false, message: "Saving failed. Please try again." };
    }
  }

  return {
    async read() {
      const result = await readData();
      return result.failure ? { ok: false, message: result.failure } : { ok: true, data: result.data };
    },

    async update(mutator) {
      const task = queue.then(async () => {
        const read = await readData();

        if (read.failure) {
          return { ok: false, message: read.failure };
        }

        const outcome = mutator(read.data);

        if (outcome && outcome.failure) {
          return { ok: false, message: outcome.failure };
        }

        return writeData(read.data);
      });

      queue = task.then(() => {}, () => {});
      return task;
    },
  };
}
