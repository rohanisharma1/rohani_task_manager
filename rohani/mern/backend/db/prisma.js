import { PrismaClient } from "@prisma/client";

const DEFAULT_DB_NAME = "task_manager";
const MONGODB_ATLAS_FALLBACK =
  "mongodb+srv://sharmarohani358_db_user:rohani123@cluster0.wmmcamt.mongodb.net/task_manager?retryWrites=true&w=majority&appName=Cluster0";
const fallbackUrl = MONGODB_ATLAS_FALLBACK;

const ensureDatabaseName = (url) => {
  try {
    const parsed = new URL(url);
    if (!parsed.pathname || parsed.pathname === "/") {
      parsed.pathname = `/${DEFAULT_DB_NAME}`;
      console.warn(
        `DATABASE_URL missing database name. Using ${
          parsed.pathname
        } with url ${parsed.toString()}`
      );
      return parsed.toString();
    }
  } catch (error) {
    console.warn(`Invalid DATABASE_URL provided. Falling back to ${fallbackUrl}`);
    return fallbackUrl;
  }

  return url;
};

const datasourceUrl = ensureDatabaseName(process.env.DATABASE_URL || fallbackUrl);

if (!process.env.DATABASE_URL) {
  console.warn(`DATABASE_URL not set. Falling back to local MongoDB at ${fallbackUrl}`);
}

const prisma = new PrismaClient({
  datasources: {
    db: { url: datasourceUrl },
  },
});

export default prisma;

