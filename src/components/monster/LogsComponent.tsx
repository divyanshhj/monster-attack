export interface Log {
  id: number;
  msg: string;
  type: "player" | "monster";
}

const LogsComponent = ({
  logs,
}: {
  logs: { playerLogs: Log[]; monsterLogs: Log[] };
}) => {
  return (
    <div className="mt-10 border-t pt-6">
      {logs.playerLogs.length === 0 && logs.monsterLogs.length === 0 ? (
        <div className="bg-slate-50 p-4 rounded-2xl border text-sm text-gray-500 text-center">
          No logs available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Player Logs */}
          <ul className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-2xl border text-sm">
            <p className="font-bold mb-2 text-blue-600">Player</p>
            {logs.playerLogs.map((log) => (
              <li key={log.id} className="py-1 font-medium text-blue-600">
                • {log.msg}
              </li>
            ))}
          </ul>

          {/* Monster Logs */}
          <ul className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-2xl border text-sm">
            <p className="font-bold mb-2 text-red-600">Monster</p>
            {logs.monsterLogs.map((log) => (
              <li key={log.id} className="py-1 font-medium text-red-600">
                • {log.msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogsComponent;
