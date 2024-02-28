export const checkIfLinkIsActive = (to: string, pathname: string) => {
  return pathname === to;
};
export const getActiveId = (
  pathname: string,
  sliderItems: {
    id: string | number;
    additionalLinksToMatch: string[];
    path: string;
  }[]
) => {
  const activeId = sliderItems.filter((s) => {
    let _res = checkIfLinkIsActive(s.path, pathname);
    if (s.additionalLinksToMatch && !_res) {
      try {
        s?.additionalLinksToMatch?.forEach((v) => {
          const res = checkIfLinkIsActive(v, pathname);
          console.log("PATH: ", v);
          console.log("PATHNAME: ", pathname);
          console.log("RES: ", res);
          console.log("########################");
          if (res) {
            _res = res;
            throw Error(
              "We found a match. We need to jump out. Again, for loops would have been much more elegant."
            );
          }
        });
      } catch (e) {
        // intentionally left blank. Again. I wonder when this will also become a stringent security measure.
      }
    }
    return _res;
  });
  if (activeId.length) {
    return activeId[0].id;
  }
  return sliderItems[0].id;
};
const items = [
  {
    id: "1",
    path: "/test",
    additionalLinksToMatch: ["/test-match-one", "test-match-one-again"],
  },
  {
    id: "2",
    path: "/test-two",
    additionalLinksToMatch: ["/test-match-two", "test-match-two-again"],
  },
];

console.log(getActiveId("/test-match-two-again", items));