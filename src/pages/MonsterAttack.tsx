import { useState } from "react";
import GameCard from "../components/ui/GameCard";
import HealthBar from "../components/ui/HealthBar";
import GameButton from "../components/ui/Button";
import LogsComponent, { type Log } from "../components/monster/LogsComponent";
import { getRandom } from "../utils/helpers";
import type { ActionType, GameStatus, LogType } from "../types/game";

const GAME_CONFIG = {
  INITIAL_HEALTH: 100,
  MAX_HEALTH: 100,
  HEAL_VALUE: 10,
  ATTACK_MIN: 1,
  ATTACK_MAX: 10,
  SPECIAL_MIN: 10,
  SPECIAL_MAX: 20,
  MONSTER_MIN: 1,
  MONSTER_MAX: 20,
};

const ACTION_BUTTONS: { label: string; type: ActionType; color: string }[] = [
  { label: "ATTACK", type: "attack", color: "bg-orange-500" },
  { label: "SPECIAL", type: "special", color: "bg-purple-600" },
  { label: "HEAL", type: "heal", color: "bg-green-600" },
  { label: "GIVE UP", type: "giveup", color: "bg-slate-400" },
];

const MonsterAttack = () => {
  const [playerHealth, setPlayerHealth] = useState<number>(
    GAME_CONFIG.INITIAL_HEALTH,
  );
  const [monsterHealth, setMonsterHealth] = useState<number>(
    GAME_CONFIG.INITIAL_HEALTH,
  );
  const [status, setStatus] = useState<GameStatus>("idle");
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = (msg: string, type: LogType) => {
    setLogs((prev) => [{ id: Math.random(), msg, type }, ...prev]);
  };

  const resetGame = (newStatus: GameStatus) => {
    setPlayerHealth(GAME_CONFIG.INITIAL_HEALTH);
    setMonsterHealth(GAME_CONFIG.INITIAL_HEALTH);
    setLogs([]);
    setStatus(newStatus);
  };

  const executeMonsterTurn = () => {
    const dmg = getRandom(GAME_CONFIG.MONSTER_MIN, GAME_CONFIG.MONSTER_MAX);
    setPlayerHealth((prev) => {
      const newHealth = Math.max(prev - dmg, 0);

      if (newHealth <= 0) {
        setStatus("lost");
      }

      return newHealth;
    });
    addLog(`Monster hits Player for ${dmg}%`, "monster");
  };

  const handleAction = (type: ActionType): void => {
    if (type === "giveup") {
      resetGame("idle");
      return;
    }

    if (type === "heal") {
      const healValue = GAME_CONFIG.HEAL_VALUE;

      setPlayerHealth((prev) =>
        Math.min(prev + healValue, GAME_CONFIG.MAX_HEALTH),
      );

      addLog(`Player heals for ${healValue}%`, "player");
      executeMonsterTurn();
      return;
    }

    const dmg =
      type === "attack"
        ? getRandom(GAME_CONFIG.ATTACK_MIN, GAME_CONFIG.ATTACK_MAX)
        : getRandom(GAME_CONFIG.SPECIAL_MIN, GAME_CONFIG.SPECIAL_MAX);

    const newHealth = Math.max(monsterHealth - dmg, 0);

    setMonsterHealth(newHealth);
    addLog(`Player ${type}s for ${dmg}%`, "player");

    if (newHealth <= 0) {
      setStatus("won");
      return;
    }
    executeMonsterTurn();
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
              {(status === "won" || status === "lost") && (
                <h2
                  className={`text-4xl font-black mb-6 uppercase italic ${status === "won" ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {status === "won" ? "Victory!" : "Defeat!"}
                </h2>
              )}
              <GameButton
                onClick={() => resetGame("playing")}
                className="bg-indigo-600 text-white px-16 py-4 rounded-full text-xl"
              >
                {status === "idle" ? "START GAME" : "RETRY"}
              </GameButton>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              {ACTION_BUTTONS.map((btn) => {
                const isSpecialDisabled =
                  btn.type === "special" && playerHealth <= 90;

                return (
                  <GameButton
                    key={btn.type}
                    onClick={() => handleAction(btn.type)}
                    className={`${btn.color} text-white`}
                    disabled={isSpecialDisabled}
                    title={
                      isSpecialDisabled
                        ? "Special attack available only above 90% health"
                        : ""
                    }
                  >
                    {btn.label}
                  </GameButton>
                );
              })}
            </div>
          )}
        </div>
        {status !== "idle" && <LogsComponent logs={logs} />}
      </GameCard>
    </div>
  );
};

export default MonsterAttack;
