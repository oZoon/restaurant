export const colors = {
  white: "#FFFFFF",
  mainText: "#333333",
  realBlack: "#000000",
  grey: {
    tone1: "#76767A",
    tone2: "#A7A8AB",
    tone3: "#F1F1F1",
    tone4: "#F7F7F7",
  },
  blue: {
    tone1: "#0061D9",
    tone2: "#0050B2",
    tone3: "#243462",
  },
  red: "#E52E2E",
  transparent: "transparent",
}

export const hexToDecimal = (color: string): number[] =>
  color
    .slice(1)
    .toLowerCase()
    .split(/(?=(?:..)*$)/)
    .map((item) =>
      item
        .split("")
        .reduce(
          (result: number, char: string) =>
            result * 16 + "0123456789abcdef".indexOf(char),
          0
        )
    )
