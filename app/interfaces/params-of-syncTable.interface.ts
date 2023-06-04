type TAction = "create" | "update" | "delete";

export default interface IParamsOfSyncTable {
    table: string;
    action: TAction;
    data: {
        record: any;
    };
}