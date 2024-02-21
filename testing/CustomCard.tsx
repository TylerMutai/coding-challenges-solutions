import React, { FC, ReactElement } from "react";
import { cardColors, cardShapes } from "../../../../../theme/cardStyles";
import {
  supportedColors,
  supportedShapes,
} from "../../../../../theme/extendedPaletteOptions";

export interface Props {
  shape?: supportedShapes;
  color?: supportedColors;
  className?: string;
  children: ReactElement | ReactElement[];
}

const CustomCard: FC<Props> = ({
  shape = "small",
  color = "secondary",
  className = "w-full h-full",
  children,
}: Props) => {
  return (
    <div
      className={`flex flex-col items-stretch justify-start ${
        cardShapes[shape]
      } ${cardColors("light")[color]} shadow-bs ${className} `}
    >
      {children}
    </div>
  );
};

export default CustomCard;
