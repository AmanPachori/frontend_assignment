import { cryptoInfo } from "@/types/CoinInfo";
import { DropResult } from "react-beautiful-dnd";

export const onDragEnd = (
  result: DropResult,
  wishlist: cryptoInfo[],
  trending: cryptoInfo[],
  addToWishlist: (item: cryptoInfo) => void,
  removeFromWishlist: (item: cryptoInfo) => void,
  destinationDroppableId: string
) => {
  const { source, destination } = result;

  if (!destination) return;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  let itemToMove: cryptoInfo;

  if (source.droppableId === "wishlist") {
    itemToMove = wishlist[source.index];
    if (destination.droppableId !== "wishlist") {
      removeFromWishlist(itemToMove);
    }
  }

  if (
    destination.droppableId === "wishlist" &&
    source.droppableId === destinationDroppableId
  ) {
    itemToMove = trending[source.index];
    const isDuplicate = wishlist.some((item) => item.id === itemToMove.id);

    if (!isDuplicate) {
      addToWishlist(itemToMove);
    }
  }
};
