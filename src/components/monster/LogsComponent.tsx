import { useMemo } from "react";

export interface Log {
  id: number;
  msg: string;
  type: "player" | "monster";
}

const LogsComponent = ({ logs }: { logs: Log[] }) => {
  const { playerLogs, monsterLogs } = useMemo(() => {
    const playerLogs: Log[] = [];
    const monsterLogs: Log[] = [];

    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      if (log.type === "player") playerLogs.push(log);
      else monsterLogs.push(log);
    }

    return { playerLogs, monsterLogs };
  }, [logs]);

  return (
    <div className="mt-10 border-t pt-6">
      {logs.length === 0 ? (
        <div className="bg-slate-50 p-4 rounded-2xl border text-sm text-gray-500 text-center">
          No logs available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Player Logs */}
          <ul className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-2xl border text-sm">
            <p className="font-bold mb-2 text-blue-600">Player</p>
            {playerLogs.map((log) => (
              <li key={log.id} className="py-1 font-medium text-blue-600">
                • {log.msg}
              </li>
            ))}
          </ul>

          {/* Monster Logs */}
          <ul className="max-h-40 overflow-y-auto bg-slate-50 p-4 rounded-2xl border text-sm">
            <p className="font-bold mb-2 text-red-600">Monster</p>
            {monsterLogs.map((log) => (
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
