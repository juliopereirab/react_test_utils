(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

async function convert(base: string, destination: string) {
    try {
      const result = await fetch(
        `https://api.exchangeratesapi.io/latest?base=${base}`
      );
      const data = await result.json();
      return data.rates[destination];
    } catch (e) {
      return null;
    }
  }

describe("checking globals", () => {

    beforeEach(() => {
        (fetch as any).mockClear();
      });
      
      it("finds exchange", async () => {
        const rate = await convert("USD", "CAD");
      
        expect(rate).toEqual(1.42);
        expect(fetch).toHaveBeenCalledTimes(1);
      });
})