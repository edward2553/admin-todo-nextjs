export interface ZodErrorResponse {
    issues: Issue[];
    name:   string;
}

export interface Issue {
    code:     string;
    expected: string;
    received: string;
    path:     string[];
    message:  string;
}
