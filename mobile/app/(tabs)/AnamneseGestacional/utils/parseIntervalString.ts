export const parseIntervalString = (intervalString: string) => {
  const regex = /(\d+)\s*hr\s*(\d+)\s*min\s*(\d+)\s*segs/
  const match = intervalString.match(regex)

  if (match) {
    const [, intervalHours, intervalParsedMinutes, intervalSeconds] =
      match.map(Number)
    return {
      intervalHours,
      intervalMinutes: intervalParsedMinutes,
      intervalSeconds,
    }
  }

  return { intervalHours: 0, intervalMinutes: 0, intervalSeconds: 0 }
}

export const parseDurationString = (durationString: string) => {
  const regex = /(\d+)\s*min\s*(\d+)/
  const match = durationString.match(regex)

  if (match) {
    const [, durationParsedMinutes, durationSeconds] = match
    return {
      durationMinutes: Number(durationParsedMinutes),
      durationSeconds: Number(durationSeconds),
    }
  }

  return { durationMinutes: 0, durationSeconds: 0 }
}
