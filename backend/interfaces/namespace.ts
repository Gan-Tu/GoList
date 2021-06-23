export interface ListNameMetadata {
  // This must be unique across all list name namespace
  name: string;

  // The live list UID to show to when visiting a list via go.list/xxx.
  //
  // This is useful when there are multiple lists with the same list name, or
  // multiple versions of the same list. It helps decide which lists or version
  // to show. Note, support for A/B testing and additional versioning control
  // will come in future.
  liveListUid: string;

  // The owner of this list name, if applicable
  ownerUid?: string;
  // If true, this list name is reserved and cannot be used by customers
  // If this field is not specified, assume this is false.
  reserved?: boolean;
  // If true, this list name is available for use but with a premium cost
  // If this field is not specified, assume this is false.
  premiumName?: boolean;
  // The price of the premium list name.
  // This is only applicable if 'premiumName' is true.
  premiumPrice?: number;
}
