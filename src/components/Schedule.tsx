import { useState } from "react";
import type { Anime } from "../types";
import { SectionHeader } from "./Sections";

interface ScheduleProps {
  scheduleData: { [key: string]: Anime[] };
  loading: boolean;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export function WeeklySchedule({ scheduleData, loading }: ScheduleProps) {
  const currentDayStr = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  
  return (
    <section className="max-w-[1400px] mx-auto px-8 lg:px-16 py-11 md:py-[72px]" id="schedule">
      <SectionHeader label="THIS WEEK" titlePrefix="Release" titleHighlight="Schedule" />
      
      {loading && Object.keys(scheduleData).length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {DAYS.map((day) => (
             <div key={day} className="flex flex-col gap-3">
                <div className="h-4 w-1/2 bg-[var(--color-card)] rounded mb-2"></div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-[60px] bg-[var(--color-card)] rounded-[var(--radius-card)]"></div>
                ))}
             </div>
          ))}
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0 lg:px-0 lg:mx-0 lg:gap-4 gap-4">
          {DAYS.map((day) => {
            const isToday = day === currentDayStr;
            const dayAnimes = scheduleData[day] || [];
            
            return (
              <div 
                key={day} 
                className={`min-w-[180px] flex-shrink-0 snap-start rounded-[var(--radius-card)] p-3 ${
                  isToday 
                    ? "bg-[var(--color-surface)] border-l-2 border-[var(--color-neon-cyan)] shadow-[0_0_15px_rgba(0,229,204,0.05)]" 
                    : ""
                }`}
              >
                <div className={`font-[var(--font-ui)] text-[10px] uppercase tracking-[2px] mb-4 ${isToday ? "text-[var(--color-neon-cyan)] font-bold" : "text-[var(--color-muted)]"}`}>
                  {day} {isToday && "(Today)"}
                </div>
                
                <div className="flex flex-col gap-3">
                  {dayAnimes.slice(0, 4).map(anime => (
                    <a 
                      key={anime.mal_id}
                      href={anime.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 p-2 bg-[var(--color-card)] hover:bg-[var(--color-card-hover)] rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-neon-cyan)] transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-14 flex-shrink-0 rounded-[2px] overflow-hidden bg-black relative">
                        {anime.images?.jpg?.large_image_url ? (
                          <img 
                            src={anime.images.jpg.large_image_url} 
                            alt={anime.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-[var(--font-head)] font-bold leading-tight truncate mb-1 text-[var(--color-ink)] group-hover:text-white">
                          {anime.title_english || anime.title}
                        </div>
                        <div className="text-[10px] font-[var(--font-ui)] text-[var(--color-gold)]">
                          ★ {anime.score || "N/A"}
                        </div>
                      </div>
                    </a>
                  ))}
                  
                  {dayAnimes.length > 4 && (
                     <div className="text-center mt-2">
                       <span className="text-[10px] font-[var(--font-ui)] text-[var(--color-muted)] hover:text-[var(--color-neon-cyan)] cursor-pointer tracking-wider">
                         + {dayAnimes.length - 4} MORE
                       </span>
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
