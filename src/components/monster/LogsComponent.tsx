export interface Log {
  id: number;
  msg: string;
  type: "player" | "monster";
}

const LogsComponent = ({ logs }: { logs: Log[] }) => {
  if (logs.length === 0) return null;
  return (
    <div className="mt-10 border-t pt-6">
      <ul className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-2xl border text-sm">
        {logs.map((log) => (
          <li
            key={log.id}
            className={`py-1 font-medium ${log.type === "player" ? "text-blue-600" : "text-red-600"}`}
          >
            • {log.msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsComponent;
