import * as monaco from "monaco-editor";

interface SqlCompletionItem extends monaco.languages.CompletionItem {}

interface SqlCompletionItemProvider
  extends monaco.languages.CompletionItemProvider {
  provideCompletionItems: (
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ) => monaco.languages.ProviderResult<monaco.languages.CompletionList>;
}

export const registerSqlCompletions = (
  monaco: typeof import("monaco-editor")
): void => {
  monaco.languages.register({ id: "sql" });

  const completionItemProvider: SqlCompletionItemProvider = {
    provideCompletionItems: (
      model: monaco.editor.ITextModel,
      position: monaco.Position
    ): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
      const word = model.getWordUntilPosition(position);
      const range: monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions: SqlCompletionItem[] = [
        {
          label: "SELECT",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "SELECT ",
          range,
        },
        {
          label: "FROM",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "FROM ",
          range,
        },
        {
          label: "WHERE",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "WHERE ",
          range,
        },
        {
          label: "patients",
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: "patients",
          detail: "table name",
          range,
        },
        {
          label: "id",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "id",
          detail: "column name",
          range,
        },
        {
          label: "name",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "name",
          detail: "column name",
          range,
        },
        {
          label: "email",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "email",
          detail: "column name",
          range,
        },
        {
          label: "phone",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "phone",
          detail: "column name",
          range,
        },
        {
          label: "gender",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "gender",
          detail: "column name",
          range,
        },
        {
          label: "address",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "address",
          detail: "column name",
          range,
        },
        {
          label: "dob",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "dob",
          detail: "column name",
          range,
        },
        {
          label: "created_date",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "created_date",
          detail: "column name",
          range,
        },
        {
          label: "updated_date",
          kind: monaco.languages.CompletionItemKind.Field,
          insertText: "updated_date",
          detail: "column name",
          range,
        },
      ];

      return { suggestions };
    },
  };

  monaco.languages.registerCompletionItemProvider(
    "sql",
    completionItemProvider
  );
};
