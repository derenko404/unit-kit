const l = ["ms", "s", "min", "h", "d"], d = ["mm", "cm", "inch", "dm", "m", "km"], f = ["b", "kb", "mb", "gb", "tb", "pb"], a = {
  time: {
    units: l,
    conversions: {
      ms: 1,
      s: 1e3,
      min: 6e4,
      h: 36e5,
      d: 864e5
    }
  },
  distance: {
    units: d,
    conversions: {
      mm: 1,
      cm: 10,
      inch: 25.4,
      dm: 100,
      m: 1e3,
      km: 1e6
    }
  },
  memory: {
    units: f,
    conversions: {
      b: 1,
      kb: 1e3,
      mb: 1048576,
      gb: 1073741824,
      tb: 1099511627776,
      pb: 1125899906842624
    }
  }
}, p = {
  units: {
    time: {
      defaultParseTo: "ms",
      precision: 0
    },
    distance: {
      defaultParseTo: "mm",
      precision: 2
    },
    memory: {
      defaultParseTo: "b",
      precision: 0
    }
  }
}, b = /^(\d+(\.\d+)?)(\s?)([a-zA-Z]+)$/, T = (t) => {
  const e = t.trim().match(b);
  if (!e)
    throw new Error(`unknown input format ${t}`);
  const n = parseFloat(e[1]), s = e[4].toLowerCase();
  for (const [o, { units: r }] of Object.entries(a))
    if (r.includes(s))
      return { value: n, type: o, unit: s };
  throw new Error(`unknown unit type ${t}`);
}, c = (t, e) => {
  const n = T(t), s = p.units[n.type], o = e ?? s.defaultParseTo, { conversions: r, units: u } = a[n.type];
  if (!u.includes(o))
    throw new Error(`unknown output unit ${o}`);
  const i = n.value * r[n.unit] / r[o], m = s.precision;
  return {
    formattedValue: `${i.toFixed(m)}`,
    valueAsNumber: i,
    unit: o
  };
}, I = (t, e) => {
  try {
    return c(t, e);
  } catch (n) {
    return console.error(n), null;
  }
}, v = {
  parse: c,
  safeParse: I
};
export {
  v as u
};
