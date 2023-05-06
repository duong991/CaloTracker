export function showErrorMessage(problem: any) {
    switch (problem.kind) {
        case "timeout":
            return "Request timeout"
        case "cannot-connect":
            return "Cannot connect to server"
        case "server":
            return "Server error"
        case "unauthorized":
            return "Unauthorized"
        case "forbidden":
            return "Forbidden"
        case "not-found":
            return "Not found"
        case "rejected":
            return "Rejected"
        case "unknown":
            return "Unknown error"
        case "bad-data":
            return "Bad data"
        default:
            return "Unknown error"
    }
}