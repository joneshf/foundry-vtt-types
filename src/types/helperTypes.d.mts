import type Document from "../foundry/common/abstract/document.d.mts";
import type { DeepPartial } from "./utils.d.mts";

/**
 * Returns the type of the constructor data for the given {@link DocumentData}.
 */
export type ConstructorDataType<T extends DocumentConstructor> = foundry.data.fields.SchemaField.InnerAssignmentType<
  ReturnType<T["defineSchema"]>
>;

type ObjectToDeepPartial<T> = T extends object ? DeepPartial<T> : T;

export type DocumentConstructor = Pick<typeof Document, keyof typeof Document> &
  (new (...args: any[]) => Document<any, any, any>);

export type PlaceableObjectConstructor = Pick<typeof PlaceableObject, keyof typeof PlaceableObject> &
  (new (...args: any[]) => PlaceableObject<any>);

export type ConfiguredDocumentClass<T extends DocumentConstructor> = ConfiguredDocumentClassForName<
  T["metadata"]["name"]
>;

export type DocumentType =
  | "Actor"
  | "ActorDelta"
  | "Adventure"
  | "Cards"
  | "ChatMessage"
  | "Combat"
  | "FogExploration"
  | "Folder"
  | "Item"
  | "JournalEntry"
  | "JournalEntryPage"
  | "Macro"
  | "Playlist"
  | "RollTable"
  | "Scene"
  | "Setting"
  | "User"
  | "ActiveEffect"
  | "Card"
  | "TableResult"
  | "PlaylistSound"
  | "AmbientLight"
  | "AmbientSound"
  | "Combatant"
  | "Drawing"
  | "MeasuredTemplate"
  | "Note"
  | "Tile"
  | "Token"
  | "Wall";

export type PlaceableDocumentType =
  | "AmbientLight"
  | "AmbientSound"
  | "Drawing"
  | "MeasuredTemplate"
  | "Note"
  | "Tile"
  | "Token"
  | "Wall";

// TODO: Probably a way to auto-determine this
type DocumentTypeWithTypeData = "Actor" | "Card" | "Cards" | "Item" | "JournalEntryPage";

/**
 * Actual document types that go in folders
 */
export type FolderDocumentTypes = Exclude<foundry.CONST.FOLDER_DOCUMENT_TYPES, "Compendium">;

export type DocumentSubTypes<T extends DocumentType> = "type" extends keyof InstanceType<
  ConfiguredDocumentClassForName<T>
>
  ? InstanceType<ConfiguredDocumentClassForName<T>>["type"]
  : typeof foundry.CONST.BASE_DOCUMENT_TYPE;

export type ConfiguredDocumentClassForName<Name extends DocumentType> = CONFIG[Name]["documentClass"];

export type ConfiguredObjectClassForName<Name extends PlaceableDocumentType> = CONFIG[Name]["objectClass"];

export type ConfiguredData<Name extends string> = Name extends keyof DataConfig ? DataConfig[Name] : {};

export type ConfiguredSource<Name extends string> = Name extends keyof SourceConfig ? SourceConfig[Name] : {};

export type ConfiguredFlags<T extends string> = T extends keyof FlagConfig
  ? FlagConfig[T] & Record<string, unknown>
  : Record<string, unknown>;

export type ModuleRequiredOrOptional<Name extends string> = Name extends keyof RequiredModules ? never : undefined;

export type ConfiguredModuleData<Name extends string> = Name extends keyof ModuleConfig ? ModuleConfig[Name] : {};

export type ConfiguredModule<Name extends string> =
  ModuleRequiredOrOptional<Name> extends never
    ? ConfiguredModuleData<Name>
    :
        | (ConfiguredModuleData<Name> & { active: true })
        // flawed, can't use `key in module` this way, but omitting the Partial Record type kills nullish
        // collocating, which is probably the better DX.
        | ({ active: false } & Record<keyof ConfiguredModuleData<Name>, undefined>);

export type ToObjectFalseType<T> = T extends {
  toObject: (source: false) => infer U;
}
  ? U
  : T;

export type ConfiguredSheetClass<T extends DocumentConstructor> = T["metadata"]["name"] extends keyof CONFIG
  ? "sheetClass" extends keyof CONFIG[T["metadata"]["name"]]
    ? CONFIG[T["metadata"]["name"]]["sheetClass"]
    : never
  : T;

export type ObjectClass<T extends DocumentConstructor> = T["metadata"]["name"] extends keyof CONFIG
  ? "objectClass" extends keyof CONFIG[T["metadata"]["name"]]
    ? CONFIG[T["metadata"]["name"]]["objectClass"]
    : never
  : T;

export type LayerClass<T extends DocumentConstructor> = T["metadata"]["name"] extends keyof CONFIG
  ? "layerClass" extends keyof CONFIG[T["metadata"]["name"]]
    ? CONFIG[T["metadata"]["name"]]["layerClass"]
    : never
  : T;

export type DataSourceForPlaceable<P extends PlaceableObject> =
  P extends PlaceableObject<infer Doc> ? (Doc extends Document<infer D, any> ? D["_source"] : never) : never;
