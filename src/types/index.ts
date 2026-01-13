export type TAPIResponse = {
    code: "api-ok" | "api-fail",
    message: string,
}
export type TEmoji = Record<string, any>;