const isValidNeoId = (uuid: string): boolean => {
  if (
    uuid.match(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$"
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export { isValidNeoId };
