import { expectTypeOf } from "vitest";
import type { StoredDocument } from "../../../../../src/types/utils.mts";

const journal = new Journal();
expectTypeOf(journal.get("", { strict: true })).toEqualTypeOf<StoredDocument<JournalEntry>>();
expectTypeOf(journal.toJSON()).toEqualTypeOf<StoredDocument<JournalEntry>["data"]["_source"][]>();
expectTypeOf(journal.directory).toEqualTypeOf<JournalDirectory | undefined>();
