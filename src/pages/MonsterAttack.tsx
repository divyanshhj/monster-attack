import React, { useState, useEffect } from "react";
import { GameCard } from "../components/ui/GameCard";
import { HealthBar } from "../components/ui/HealthBar";
import { GameButton } from "../components/ui/Button";
import LogsComponent, { type Log } from "../components/monster/LogsComponent";
import { getRandom } from "../utils/helpers";

type GameStatus = "idle" | "playing" | "won" | "lost";
type ActionType = "attack" | "special" | "heal";
type LogType = "player" | "monster";

interface ActionButtonProps {
  label: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

const MonsterAttack: React.FC = () => {
  const [playerHealth, setPlayerHealth] = useState<number>(100);
  const [monsterHealth, setMonsterHealth] = useState<number>(100);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (status !== "playing") return;
    if (monsterHealth <= 0) setStatus("won");
    else if (playerHealth <= 0) setStatus("lost");
  }, [monsterHealth, playerHealth, status]);

  const addLog = (msg: string, type: LogType) => {
    setLogs((prev) => [{ id: Math.random(), msg, type }, ...prev]);
  };

  const resetGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setStatus("playing");
  };

  const executeMonsterTurn = () => {
    const dmg = getRandom(1, 20);
    setPlayerHealth((prev) => Math.max(prev - dmg, 0));
    addLog(`Monster hits Player for ${dmg}%`, "monster");
  };

  const handleAction = (type: ActionType): void => {
    let currentMonsterHealth = monsterHealth;

    if (type === "heal") {
      const healValue = 10;
      setPlayerHealth((prev) => Math.min(prev + healValue, 100));
      addLog(`Player heals for ${healValue}%`, "player");
    } else {
      const dmg = type === "attack" ? getRandom(1, 10) : getRandom(10, 20);
      const newHealth = Math.max(monsterHealth - dmg, 0);
      setMonsterHealth(newHealth);
      currentMonsterHealth = newHealth;
      addLog(`Player ${type}s for ${dmg}%`, "player");
    }

    if (currentMonsterHealth > 0) {
      executeMonsterTurn();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
      <GameCard title="Monster Attack">
        <div className="grid grid-cols-2 gap-8 mb-10">
          <HealthBar label="You" health={playerHealth} color="bg-emerald-500" />
          <HealthBar
            label="Monster"
            health={monsterHealth}
            color="bg-rose-500"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          {status !== "playing" ? (
            <div className="text-center">
              {status !== "idle" && (
                <h2
                  className={`text-4xl font-black mb-6 uppercase italic ${status === "won" ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {status === "won" ? "Victory!" : "Defeat!"}
                </h2>
              )}
              <GameButton
                onClick={resetGame}
                className="bg-indigo-600 text-white px-16 py-4 rounded-full text-xl"
              >
                {status === "idle" ? "START GAME" : "RETRY"}
              </GameButton>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              <ActionButton
                label="ATTACK"
                color="bg-orange-500"
                onClick={() => handleAction("attack")}
              />
              <ActionButton
                label="SPECIAL"
                color="bg-purple-600"
                onClick={() => handleAction("special")}
                disabled={playerHealth <= 90}
              />
              <ActionButton
                label="HEAL"
                color="bg-green-600"
                onClick={() => handleAction("heal")}
              />
              <ActionButton
                label="GIVE UP"
                color="bg-slate-400"
                onClick={() => setStatus("idle")}
              />
            </div>
          )}
        </div>
        <LogsComponent logs={logs} />
      </GameCard>
    </div>
  );
};

const ActionButton = ({
  label,
  color,
  onClick,
  disabled = false,
}: ActionButtonProps) => (
  <GameButton
    onClick={onClick}
    disabled={disabled}
    className={`${color} text-white`}
  >
    {label}
  </GameButton>
);

export default MonsterAttack;
