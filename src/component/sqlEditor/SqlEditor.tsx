import { type FC, useCallback } from "react";
import Editor from "@monaco-editor/react";
import type { OnChange, OnMount } from "@monaco-editor/react";
import { registerSqlCompletions } from "../../data/EditorSuggestions";
import { Skeleton } from "@mui/material";

interface MonacoEditorProps {
  query: string;
  onChange: OnChange;
}
const SqlEditor: FC<MonacoEditorProps> = ({ query, onChange }) => {
  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editor.focus();
    registerSqlCompletions(monaco);
  }, []);

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="sql"
      defaultValue={query}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
      }}
      loading={
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ zIndex: 1, bgcolor: "#727a7f" }}
        />
      }
    />
  );
};

export default SqlEditor;
