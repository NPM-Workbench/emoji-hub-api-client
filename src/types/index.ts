export type TAPIResponse = {
    code: "api-ok" | "api-fail",
    message: string,
}
export type TRandomEmoji = Record<string, any>;