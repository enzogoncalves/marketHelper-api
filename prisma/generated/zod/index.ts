import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['uid','email','password','created_at','updated_at','passwordResetToken']);

export const AuthTokenScalarFieldEnumSchema = z.enum(['id','token','createdAt','expiresAt','userId']);

export const TaskScalarFieldEnumSchema = z.enum(['id','title','text','completed','createdAt','completedAt','priority','userUid']);

export const MarketListScalarFieldEnumSchema = z.enum(['id','title','userUid']);

export const MarketListItemScalarFieldEnumSchema = z.enum(['id','name','quantity','weight','currency','brand','marketListId']);

export const PriceScalarFieldEnumSchema = z.enum(['id','type','value','unit','marketListItemId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  uid: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// AUTH TOKEN SCHEMA
/////////////////////////////////////////

export const AuthTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  userId: z.string(),
})

export type AuthToken = z.infer<typeof AuthTokenSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
  priority: z.string(),
  userUid: z.string().nullable(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// MARKET LIST SCHEMA
/////////////////////////////////////////

export const MarketListSchema = z.object({
  id: z.string(),
  title: z.string(),
  userUid: z.string().nullable(),
})

export type MarketList = z.infer<typeof MarketListSchema>

/////////////////////////////////////////
// MARKET LIST ITEM SCHEMA
/////////////////////////////////////////

export const MarketListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().nullable(),
  currency: z.string(),
  brand: z.string(),
  marketListId: z.string().nullable(),
})

export type MarketListItem = z.infer<typeof MarketListItemSchema>

/////////////////////////////////////////
// PRICE SCHEMA
/////////////////////////////////////////

export const PriceSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string(),
  marketListItemId: z.string().nullable(),
})

export type Price = z.infer<typeof PriceSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  task: z.boolean().optional(),
  marketLists: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  uid: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  passwordResetToken: z.boolean().optional(),
  authToken: z.union([z.boolean(),z.lazy(() => AuthTokenArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  marketLists: z.union([z.boolean(),z.lazy(() => MarketListArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AUTH TOKEN
//------------------------------------------------------

export const AuthTokenIncludeSchema: z.ZodType<Prisma.AuthTokenInclude> = z.object({
}).strict()

export const AuthTokenArgsSchema: z.ZodType<Prisma.AuthTokenDefaultArgs> = z.object({
  select: z.lazy(() => AuthTokenSelectSchema).optional(),
  include: z.lazy(() => AuthTokenIncludeSchema).optional(),
}).strict();

export const AuthTokenSelectSchema: z.ZodType<Prisma.AuthTokenSelect> = z.object({
  id: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  text: z.boolean().optional(),
  completed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  completedAt: z.boolean().optional(),
  priority: z.boolean().optional(),
  userUid: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// MARKET LIST
//------------------------------------------------------

export const MarketListIncludeSchema: z.ZodType<Prisma.MarketListInclude> = z.object({
}).strict()

export const MarketListArgsSchema: z.ZodType<Prisma.MarketListDefaultArgs> = z.object({
  select: z.lazy(() => MarketListSelectSchema).optional(),
  include: z.lazy(() => MarketListIncludeSchema).optional(),
}).strict();

export const MarketListCountOutputTypeArgsSchema: z.ZodType<Prisma.MarketListCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MarketListCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MarketListCountOutputTypeSelectSchema: z.ZodType<Prisma.MarketListCountOutputTypeSelect> = z.object({
  items: z.boolean().optional(),
}).strict();

export const MarketListSelectSchema: z.ZodType<Prisma.MarketListSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  userUid: z.boolean().optional(),
  items: z.union([z.boolean(),z.lazy(() => MarketListItemArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MarketListCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MARKET LIST ITEM
//------------------------------------------------------

export const MarketListItemIncludeSchema: z.ZodType<Prisma.MarketListItemInclude> = z.object({
}).strict()

export const MarketListItemArgsSchema: z.ZodType<Prisma.MarketListItemDefaultArgs> = z.object({
  select: z.lazy(() => MarketListItemSelectSchema).optional(),
  include: z.lazy(() => MarketListItemIncludeSchema).optional(),
}).strict();

export const MarketListItemCountOutputTypeArgsSchema: z.ZodType<Prisma.MarketListItemCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MarketListItemCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MarketListItemCountOutputTypeSelectSchema: z.ZodType<Prisma.MarketListItemCountOutputTypeSelect> = z.object({
  prices: z.boolean().optional(),
}).strict();

export const MarketListItemSelectSchema: z.ZodType<Prisma.MarketListItemSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  quantity: z.boolean().optional(),
  weight: z.boolean().optional(),
  currency: z.boolean().optional(),
  brand: z.boolean().optional(),
  marketListId: z.boolean().optional(),
  prices: z.union([z.boolean(),z.lazy(() => PriceArgsSchema)]).optional(),
  MarketList: z.union([z.boolean(),z.lazy(() => MarketListArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MarketListItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRICE
//------------------------------------------------------

export const PriceIncludeSchema: z.ZodType<Prisma.PriceInclude> = z.object({
}).strict()

export const PriceArgsSchema: z.ZodType<Prisma.PriceDefaultArgs> = z.object({
  select: z.lazy(() => PriceSelectSchema).optional(),
  include: z.lazy(() => PriceIncludeSchema).optional(),
}).strict();

export const PriceSelectSchema: z.ZodType<Prisma.PriceSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  value: z.boolean().optional(),
  unit: z.boolean().optional(),
  marketListItemId: z.boolean().optional(),
  MarketListItem: z.union([z.boolean(),z.lazy(() => MarketListItemArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  passwordResetToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authToken: z.union([ z.lazy(() => AuthTokenNullableScalarRelationFilterSchema),z.lazy(() => AuthTokenWhereInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskListRelationFilterSchema).optional(),
  marketLists: z.lazy(() => MarketListListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  passwordResetToken: z.lazy(() => SortOrderSchema).optional(),
  authToken: z.lazy(() => AuthTokenOrderByWithRelationInputSchema).optional(),
  task: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  marketLists: z.lazy(() => MarketListOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    uid: z.string(),
    email: z.string()
  }),
  z.object({
    uid: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  uid: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  passwordResetToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authToken: z.union([ z.lazy(() => AuthTokenNullableScalarRelationFilterSchema),z.lazy(() => AuthTokenWhereInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskListRelationFilterSchema).optional(),
  marketLists: z.lazy(() => MarketListListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  passwordResetToken: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  uid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  passwordResetToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AuthTokenWhereInputSchema: z.ZodType<Prisma.AuthTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuthTokenWhereInputSchema),z.lazy(() => AuthTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthTokenWhereInputSchema),z.lazy(() => AuthTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AuthTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AuthTokenWhereUniqueInputSchema: z.ZodType<Prisma.AuthTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string(),
    token: z.string(),
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
    userId: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => AuthTokenWhereInputSchema),z.lazy(() => AuthTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthTokenWhereInputSchema),z.lazy(() => AuthTokenWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AuthTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuthTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const AuthTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuthTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => AuthTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priority: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priority: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  priority: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MarketListWhereInputSchema: z.ZodType<Prisma.MarketListWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MarketListWhereInputSchema),z.lazy(() => MarketListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListWhereInputSchema),z.lazy(() => MarketListWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  items: z.lazy(() => MarketListItemListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const MarketListOrderByWithRelationInputSchema: z.ZodType<Prisma.MarketListOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional(),
  items: z.lazy(() => MarketListItemOrderByRelationAggregateInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const MarketListWhereUniqueInputSchema: z.ZodType<Prisma.MarketListWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MarketListWhereInputSchema),z.lazy(() => MarketListWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListWhereInputSchema),z.lazy(() => MarketListWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  items: z.lazy(() => MarketListItemListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const MarketListOrderByWithAggregationInputSchema: z.ZodType<Prisma.MarketListOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MarketListCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MarketListMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MarketListMinOrderByAggregateInputSchema).optional()
}).strict();

export const MarketListScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MarketListScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MarketListScalarWhereWithAggregatesInputSchema),z.lazy(() => MarketListScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListScalarWhereWithAggregatesInputSchema),z.lazy(() => MarketListScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MarketListItemWhereInputSchema: z.ZodType<Prisma.MarketListItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MarketListItemWhereInputSchema),z.lazy(() => MarketListItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListItemWhereInputSchema),z.lazy(() => MarketListItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  brand: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  marketListId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
  MarketList: z.union([ z.lazy(() => MarketListNullableScalarRelationFilterSchema),z.lazy(() => MarketListWhereInputSchema) ]).optional().nullable(),
}).strict();

export const MarketListItemOrderByWithRelationInputSchema: z.ZodType<Prisma.MarketListItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  marketListId: z.lazy(() => SortOrderSchema).optional(),
  prices: z.lazy(() => PriceOrderByRelationAggregateInputSchema).optional(),
  MarketList: z.lazy(() => MarketListOrderByWithRelationInputSchema).optional()
}).strict();

export const MarketListItemWhereUniqueInputSchema: z.ZodType<Prisma.MarketListItemWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MarketListItemWhereInputSchema),z.lazy(() => MarketListItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListItemWhereInputSchema),z.lazy(() => MarketListItemWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  weight: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  brand: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  marketListId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
  MarketList: z.union([ z.lazy(() => MarketListNullableScalarRelationFilterSchema),z.lazy(() => MarketListWhereInputSchema) ]).optional().nullable(),
}).strict());

export const MarketListItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.MarketListItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  marketListId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MarketListItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MarketListItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MarketListItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MarketListItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MarketListItemSumOrderByAggregateInputSchema).optional()
}).strict();

export const MarketListItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MarketListItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MarketListItemScalarWhereWithAggregatesInputSchema),z.lazy(() => MarketListItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListItemScalarWhereWithAggregatesInputSchema),z.lazy(() => MarketListItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  currency: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  brand: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  marketListId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PriceWhereInputSchema: z.ZodType<Prisma.PriceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  marketListItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  MarketListItem: z.union([ z.lazy(() => MarketListItemNullableScalarRelationFilterSchema),z.lazy(() => MarketListItemWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PriceOrderByWithRelationInputSchema: z.ZodType<Prisma.PriceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  marketListItemId: z.lazy(() => SortOrderSchema).optional(),
  MarketListItem: z.lazy(() => MarketListItemOrderByWithRelationInputSchema).optional()
}).strict();

export const PriceWhereUniqueInputSchema: z.ZodType<Prisma.PriceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  marketListItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  MarketListItem: z.union([ z.lazy(() => MarketListItemNullableScalarRelationFilterSchema),z.lazy(() => MarketListItemWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PriceOrderByWithAggregationInputSchema: z.ZodType<Prisma.PriceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  marketListItemId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PriceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PriceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PriceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PriceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PriceSumOrderByAggregateInputSchema).optional()
}).strict();

export const PriceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PriceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema),z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema),z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  marketListItemId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  authToken: z.lazy(() => AuthTokenCreateNestedOneWithoutUserInputSchema).optional(),
  task: z.lazy(() => TaskCreateNestedManyWithoutUserInputSchema).optional(),
  marketLists: z.lazy(() => MarketListCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  authToken: z.lazy(() => AuthTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  task: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authToken: z.lazy(() => AuthTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  task: z.lazy(() => TaskUpdateManyWithoutUserNestedInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authToken: z.lazy(() => AuthTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  task: z.lazy(() => TaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuthTokenCreateInputSchema: z.ZodType<Prisma.AuthTokenCreateInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthTokenInputSchema)
}).strict();

export const AuthTokenUncheckedCreateInputSchema: z.ZodType<Prisma.AuthTokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  userId: z.string()
}).strict();

export const AuthTokenUpdateInputSchema: z.ZodType<Prisma.AuthTokenUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuthTokenNestedInputSchema).optional()
}).strict();

export const AuthTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthTokenUncheckedUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthTokenCreateManyInputSchema: z.ZodType<Prisma.AuthTokenCreateManyInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
  userId: z.string()
}).strict();

export const AuthTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthTokenUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthTokenUncheckedUpdateManyInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  priority: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  priority: z.string(),
  userUid: z.string().optional().nullable()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userUid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  priority: z.string(),
  userUid: z.string().optional().nullable()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userUid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MarketListCreateInputSchema: z.ZodType<Prisma.MarketListCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  items: z.lazy(() => MarketListItemCreateNestedManyWithoutMarketListInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutMarketListsInputSchema).optional()
}).strict();

export const MarketListUncheckedCreateInputSchema: z.ZodType<Prisma.MarketListUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  userUid: z.string().optional().nullable(),
  items: z.lazy(() => MarketListItemUncheckedCreateNestedManyWithoutMarketListInputSchema).optional()
}).strict();

export const MarketListUpdateInputSchema: z.ZodType<Prisma.MarketListUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => MarketListItemUpdateManyWithoutMarketListNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneWithoutMarketListsNestedInputSchema).optional()
}).strict();

export const MarketListUncheckedUpdateInputSchema: z.ZodType<Prisma.MarketListUncheckedUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userUid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  items: z.lazy(() => MarketListItemUncheckedUpdateManyWithoutMarketListNestedInputSchema).optional()
}).strict();

export const MarketListCreateManyInputSchema: z.ZodType<Prisma.MarketListCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  userUid: z.string().optional().nullable()
}).strict();

export const MarketListUpdateManyMutationInputSchema: z.ZodType<Prisma.MarketListUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MarketListUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MarketListUncheckedUpdateManyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userUid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MarketListItemCreateInputSchema: z.ZodType<Prisma.MarketListItemCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutMarketListItemInputSchema).optional(),
  MarketList: z.lazy(() => MarketListCreateNestedOneWithoutItemsInputSchema).optional()
}).strict();

export const MarketListItemUncheckedCreateInputSchema: z.ZodType<Prisma.MarketListItemUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  marketListId: z.string().optional().nullable(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutMarketListItemInputSchema).optional()
}).strict();

export const MarketListItemUpdateInputSchema: z.ZodType<Prisma.MarketListItemUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutMarketListItemNestedInputSchema).optional(),
  MarketList: z.lazy(() => MarketListUpdateOneWithoutItemsNestedInputSchema).optional()
}).strict();

export const MarketListItemUncheckedUpdateInputSchema: z.ZodType<Prisma.MarketListItemUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  marketListId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutMarketListItemNestedInputSchema).optional()
}).strict();

export const MarketListItemCreateManyInputSchema: z.ZodType<Prisma.MarketListItemCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  marketListId: z.string().optional().nullable()
}).strict();

export const MarketListItemUpdateManyMutationInputSchema: z.ZodType<Prisma.MarketListItemUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MarketListItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MarketListItemUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  marketListId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PriceCreateInputSchema: z.ZodType<Prisma.PriceCreateInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string(),
  MarketListItem: z.lazy(() => MarketListItemCreateNestedOneWithoutPricesInputSchema).optional()
}).strict();

export const PriceUncheckedCreateInputSchema: z.ZodType<Prisma.PriceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string(),
  marketListItemId: z.string().optional().nullable()
}).strict();

export const PriceUpdateInputSchema: z.ZodType<Prisma.PriceUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  MarketListItem: z.lazy(() => MarketListItemUpdateOneWithoutPricesNestedInputSchema).optional()
}).strict();

export const PriceUncheckedUpdateInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  marketListItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PriceCreateManyInputSchema: z.ZodType<Prisma.PriceCreateManyInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string(),
  marketListItemId: z.string().optional().nullable()
}).strict();

export const PriceUpdateManyMutationInputSchema: z.ZodType<Prisma.PriceUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  marketListItemId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const AuthTokenNullableScalarRelationFilterSchema: z.ZodType<Prisma.AuthTokenNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AuthTokenWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AuthTokenWhereInputSchema).optional().nullable()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const MarketListListRelationFilterSchema: z.ZodType<Prisma.MarketListListRelationFilter> = z.object({
  every: z.lazy(() => MarketListWhereInputSchema).optional(),
  some: z.lazy(() => MarketListWhereInputSchema).optional(),
  none: z.lazy(() => MarketListWhereInputSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MarketListOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  passwordResetToken: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  passwordResetToken: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  passwordResetToken: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AuthTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const MarketListItemListRelationFilterSchema: z.ZodType<Prisma.MarketListItemListRelationFilter> = z.object({
  every: z.lazy(() => MarketListItemWhereInputSchema).optional(),
  some: z.lazy(() => MarketListItemWhereInputSchema).optional(),
  none: z.lazy(() => MarketListItemWhereInputSchema).optional()
}).strict();

export const MarketListItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MarketListItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListCountOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListMinOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  userUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const PriceListRelationFilterSchema: z.ZodType<Prisma.PriceListRelationFilter> = z.object({
  every: z.lazy(() => PriceWhereInputSchema).optional(),
  some: z.lazy(() => PriceWhereInputSchema).optional(),
  none: z.lazy(() => PriceWhereInputSchema).optional()
}).strict();

export const MarketListNullableScalarRelationFilterSchema: z.ZodType<Prisma.MarketListNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => MarketListWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MarketListWhereInputSchema).optional().nullable()
}).strict();

export const PriceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PriceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  marketListId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListItemAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  marketListId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  brand: z.lazy(() => SortOrderSchema).optional(),
  marketListId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MarketListItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.MarketListItemSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const MarketListItemNullableScalarRelationFilterSchema: z.ZodType<Prisma.MarketListItemNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => MarketListItemWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MarketListItemWhereInputSchema).optional().nullable()
}).strict();

export const PriceCountOrderByAggregateInputSchema: z.ZodType<Prisma.PriceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  marketListItemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PriceAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  marketListItemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceMinOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  marketListItemId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceSumOrderByAggregateInputSchema: z.ZodType<Prisma.PriceSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuthTokenCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuthTokenCreateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthTokenCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AuthTokenWhereUniqueInputSchema).optional()
}).strict();

export const TaskCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MarketListCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MarketListCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MarketListCreateWithoutUserInputSchema),z.lazy(() => MarketListCreateWithoutUserInputSchema).array(),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema),z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuthTokenUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuthTokenCreateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthTokenCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AuthTokenWhereUniqueInputSchema).optional()
}).strict();

export const TaskUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MarketListUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MarketListUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MarketListCreateWithoutUserInputSchema),z.lazy(() => MarketListCreateWithoutUserInputSchema).array(),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema),z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const AuthTokenUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthTokenUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthTokenCreateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthTokenCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AuthTokenUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AuthTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AuthTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AuthTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuthTokenUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AuthTokenUpdateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const TaskUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MarketListUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MarketListUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MarketListCreateWithoutUserInputSchema),z.lazy(() => MarketListCreateWithoutUserInputSchema).array(),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema),z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MarketListUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MarketListUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MarketListUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MarketListUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MarketListUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MarketListUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MarketListScalarWhereInputSchema),z.lazy(() => MarketListScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuthTokenUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthTokenUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuthTokenCreateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AuthTokenCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AuthTokenUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AuthTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AuthTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AuthTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AuthTokenUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AuthTokenUpdateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskCreateWithoutUserInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MarketListUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MarketListUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MarketListCreateWithoutUserInputSchema),z.lazy(() => MarketListCreateWithoutUserInputSchema).array(),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema),z.lazy(() => MarketListCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MarketListUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MarketListUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MarketListWhereUniqueInputSchema),z.lazy(() => MarketListWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MarketListUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MarketListUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MarketListUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MarketListUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MarketListScalarWhereInputSchema),z.lazy(() => MarketListScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthTokenInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAuthTokenNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthTokenInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuthTokenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuthTokenInputSchema),z.lazy(() => UserUpdateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthTokenInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTaskInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const UserUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTaskInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => UserUpdateWithoutTaskInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict();

export const MarketListItemCreateNestedManyWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemCreateNestedManyWithoutMarketListInput> = z.object({
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema).array(),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListItemCreateManyMarketListInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutMarketListsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMarketListsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMarketListsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMarketListsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const MarketListItemUncheckedCreateNestedManyWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUncheckedCreateNestedManyWithoutMarketListInput> = z.object({
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema).array(),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListItemCreateManyMarketListInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MarketListItemUpdateManyWithoutMarketListNestedInputSchema: z.ZodType<Prisma.MarketListItemUpdateManyWithoutMarketListNestedInput> = z.object({
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema).array(),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MarketListItemUpsertWithWhereUniqueWithoutMarketListInputSchema),z.lazy(() => MarketListItemUpsertWithWhereUniqueWithoutMarketListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListItemCreateManyMarketListInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MarketListItemUpdateWithWhereUniqueWithoutMarketListInputSchema),z.lazy(() => MarketListItemUpdateWithWhereUniqueWithoutMarketListInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MarketListItemUpdateManyWithWhereWithoutMarketListInputSchema),z.lazy(() => MarketListItemUpdateManyWithWhereWithoutMarketListInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MarketListItemScalarWhereInputSchema),z.lazy(() => MarketListItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutMarketListsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutMarketListsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMarketListsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMarketListsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMarketListsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMarketListsInputSchema),z.lazy(() => UserUpdateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMarketListsInputSchema) ]).optional(),
}).strict();

export const MarketListItemUncheckedUpdateManyWithoutMarketListNestedInputSchema: z.ZodType<Prisma.MarketListItemUncheckedUpdateManyWithoutMarketListNestedInput> = z.object({
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema).array(),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema),z.lazy(() => MarketListItemCreateOrConnectWithoutMarketListInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MarketListItemUpsertWithWhereUniqueWithoutMarketListInputSchema),z.lazy(() => MarketListItemUpsertWithWhereUniqueWithoutMarketListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MarketListItemCreateManyMarketListInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MarketListItemWhereUniqueInputSchema),z.lazy(() => MarketListItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MarketListItemUpdateWithWhereUniqueWithoutMarketListInputSchema),z.lazy(() => MarketListItemUpdateWithWhereUniqueWithoutMarketListInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MarketListItemUpdateManyWithWhereWithoutMarketListInputSchema),z.lazy(() => MarketListItemUpdateManyWithWhereWithoutMarketListInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MarketListItemScalarWhereInputSchema),z.lazy(() => MarketListItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PriceCreateNestedManyWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceCreateNestedManyWithoutMarketListItemInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateWithoutMarketListItemInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyMarketListItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MarketListCreateNestedOneWithoutItemsInputSchema: z.ZodType<Prisma.MarketListCreateNestedOneWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => MarketListCreateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MarketListCreateOrConnectWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => MarketListWhereUniqueInputSchema).optional()
}).strict();

export const PriceUncheckedCreateNestedManyWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUncheckedCreateNestedManyWithoutMarketListItemInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateWithoutMarketListItemInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyMarketListItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PriceUpdateManyWithoutMarketListItemNestedInputSchema: z.ZodType<Prisma.PriceUpdateManyWithoutMarketListItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateWithoutMarketListItemInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutMarketListItemInputSchema),z.lazy(() => PriceUpsertWithWhereUniqueWithoutMarketListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyMarketListItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutMarketListItemInputSchema),z.lazy(() => PriceUpdateWithWhereUniqueWithoutMarketListItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutMarketListItemInputSchema),z.lazy(() => PriceUpdateManyWithWhereWithoutMarketListItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MarketListUpdateOneWithoutItemsNestedInputSchema: z.ZodType<Prisma.MarketListUpdateOneWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MarketListCreateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MarketListCreateOrConnectWithoutItemsInputSchema).optional(),
  upsert: z.lazy(() => MarketListUpsertWithoutItemsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MarketListWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MarketListWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MarketListUpdateToOneWithWhereWithoutItemsInputSchema),z.lazy(() => MarketListUpdateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedUpdateWithoutItemsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyWithoutMarketListItemNestedInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutMarketListItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateWithoutMarketListItemInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema),z.lazy(() => PriceCreateOrConnectWithoutMarketListItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutMarketListItemInputSchema),z.lazy(() => PriceUpsertWithWhereUniqueWithoutMarketListItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyMarketListItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutMarketListItemInputSchema),z.lazy(() => PriceUpdateWithWhereUniqueWithoutMarketListItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutMarketListItemInputSchema),z.lazy(() => PriceUpdateManyWithWhereWithoutMarketListItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MarketListItemCreateNestedOneWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemCreateNestedOneWithoutPricesInput> = z.object({
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MarketListItemCreateOrConnectWithoutPricesInputSchema).optional(),
  connect: z.lazy(() => MarketListItemWhereUniqueInputSchema).optional()
}).strict();

export const MarketListItemUpdateOneWithoutPricesNestedInputSchema: z.ZodType<Prisma.MarketListItemUpdateOneWithoutPricesNestedInput> = z.object({
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MarketListItemCreateOrConnectWithoutPricesInputSchema).optional(),
  upsert: z.lazy(() => MarketListItemUpsertWithoutPricesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MarketListItemWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MarketListItemWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MarketListItemUpdateToOneWithWhereWithoutPricesInputSchema),z.lazy(() => MarketListItemUpdateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedUpdateWithoutPricesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const AuthTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date()
}).strict();

export const AuthTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date()
}).strict();

export const AuthTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AuthTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthTokenCreateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  priority: z.string()
}).strict();

export const TaskUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  priority: z.string()
}).strict();

export const TaskCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyUserInputSchema),z.lazy(() => TaskCreateManyUserInputSchema).array() ]),
}).strict();

export const MarketListCreateWithoutUserInputSchema: z.ZodType<Prisma.MarketListCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  items: z.lazy(() => MarketListItemCreateNestedManyWithoutMarketListInputSchema).optional()
}).strict();

export const MarketListUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MarketListUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  items: z.lazy(() => MarketListItemUncheckedCreateNestedManyWithoutMarketListInputSchema).optional()
}).strict();

export const MarketListCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MarketListCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MarketListWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MarketListCreateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MarketListCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MarketListCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MarketListCreateManyUserInputSchema),z.lazy(() => MarketListCreateManyUserInputSchema).array() ]),
}).strict();

export const AuthTokenUpsertWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => AuthTokenUpdateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AuthTokenCreateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => AuthTokenWhereInputSchema).optional()
}).strict();

export const AuthTokenUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AuthTokenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AuthTokenUpdateWithoutUserInputSchema),z.lazy(() => AuthTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AuthTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuthTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthTokenUncheckedUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutUserInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutUserInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutUserInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priority: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MarketListUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MarketListUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MarketListWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MarketListUpdateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MarketListCreateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MarketListUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MarketListUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MarketListWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MarketListUpdateWithoutUserInputSchema),z.lazy(() => MarketListUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MarketListUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MarketListUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MarketListScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MarketListUpdateManyMutationInputSchema),z.lazy(() => MarketListUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MarketListScalarWhereInputSchema: z.ZodType<Prisma.MarketListScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MarketListScalarWhereInputSchema),z.lazy(() => MarketListScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListScalarWhereInputSchema),z.lazy(() => MarketListScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userUid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserCreateWithoutAuthTokenInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedManyWithoutUserInputSchema).optional(),
  marketLists: z.lazy(() => MarketListCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthTokenInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  task: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthTokenInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthTokenInputSchema) ]),
}).strict();

export const UserUpsertWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuthTokenInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthTokenInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuthTokenInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuthTokenInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuthTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuthTokenInputSchema) ]),
}).strict();

export const UserUpdateWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuthTokenInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateManyWithoutUserNestedInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAuthTokenInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthTokenInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTaskInputSchema: z.ZodType<Prisma.UserCreateWithoutTaskInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  authToken: z.lazy(() => AuthTokenCreateNestedOneWithoutUserInputSchema).optional(),
  marketLists: z.lazy(() => MarketListCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTaskInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  authToken: z.lazy(() => AuthTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTaskInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const UserUpsertWithoutTaskInputSchema: z.ZodType<Prisma.UserUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTaskInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTaskInputSchema),z.lazy(() => UserUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTaskInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const UserUpdateWithoutTaskInputSchema: z.ZodType<Prisma.UserUpdateWithoutTaskInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authToken: z.lazy(() => AuthTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTaskInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authToken: z.lazy(() => AuthTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  marketLists: z.lazy(() => MarketListUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MarketListItemCreateWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemCreateWithoutMarketListInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutMarketListItemInputSchema).optional()
}).strict();

export const MarketListItemUncheckedCreateWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUncheckedCreateWithoutMarketListInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutMarketListItemInputSchema).optional()
}).strict();

export const MarketListItemCreateOrConnectWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemCreateOrConnectWithoutMarketListInput> = z.object({
  where: z.lazy(() => MarketListItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema) ]),
}).strict();

export const MarketListItemCreateManyMarketListInputEnvelopeSchema: z.ZodType<Prisma.MarketListItemCreateManyMarketListInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MarketListItemCreateManyMarketListInputSchema),z.lazy(() => MarketListItemCreateManyMarketListInputSchema).array() ]),
}).strict();

export const UserCreateWithoutMarketListsInputSchema: z.ZodType<Prisma.UserCreateWithoutMarketListsInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  authToken: z.lazy(() => AuthTokenCreateNestedOneWithoutUserInputSchema).optional(),
  task: z.lazy(() => TaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMarketListsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMarketListsInput> = z.object({
  uid: z.string().optional(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date(),
  passwordResetToken: z.string().optional().nullable(),
  authToken: z.lazy(() => AuthTokenUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  task: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMarketListsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMarketListsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMarketListsInputSchema) ]),
}).strict();

export const MarketListItemUpsertWithWhereUniqueWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUpsertWithWhereUniqueWithoutMarketListInput> = z.object({
  where: z.lazy(() => MarketListItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MarketListItemUpdateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedUpdateWithoutMarketListInputSchema) ]),
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutMarketListInputSchema) ]),
}).strict();

export const MarketListItemUpdateWithWhereUniqueWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUpdateWithWhereUniqueWithoutMarketListInput> = z.object({
  where: z.lazy(() => MarketListItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MarketListItemUpdateWithoutMarketListInputSchema),z.lazy(() => MarketListItemUncheckedUpdateWithoutMarketListInputSchema) ]),
}).strict();

export const MarketListItemUpdateManyWithWhereWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUpdateManyWithWhereWithoutMarketListInput> = z.object({
  where: z.lazy(() => MarketListItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MarketListItemUpdateManyMutationInputSchema),z.lazy(() => MarketListItemUncheckedUpdateManyWithoutMarketListInputSchema) ]),
}).strict();

export const MarketListItemScalarWhereInputSchema: z.ZodType<Prisma.MarketListItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MarketListItemScalarWhereInputSchema),z.lazy(() => MarketListItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MarketListItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MarketListItemScalarWhereInputSchema),z.lazy(() => MarketListItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  brand: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  marketListId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutMarketListsInputSchema: z.ZodType<Prisma.UserUpsertWithoutMarketListsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMarketListsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMarketListsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMarketListsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMarketListsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMarketListsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMarketListsInputSchema) ]),
}).strict();

export const UserUpdateWithoutMarketListsInputSchema: z.ZodType<Prisma.UserUpdateWithoutMarketListsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authToken: z.lazy(() => AuthTokenUpdateOneWithoutUserNestedInputSchema).optional(),
  task: z.lazy(() => TaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMarketListsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMarketListsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  passwordResetToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authToken: z.lazy(() => AuthTokenUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  task: z.lazy(() => TaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PriceCreateWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceCreateWithoutMarketListItemInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string()
}).strict();

export const PriceUncheckedCreateWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUncheckedCreateWithoutMarketListItemInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string()
}).strict();

export const PriceCreateOrConnectWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceCreateOrConnectWithoutMarketListItemInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriceCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema) ]),
}).strict();

export const PriceCreateManyMarketListItemInputEnvelopeSchema: z.ZodType<Prisma.PriceCreateManyMarketListItemInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PriceCreateManyMarketListItemInputSchema),z.lazy(() => PriceCreateManyMarketListItemInputSchema).array() ]),
}).strict();

export const MarketListCreateWithoutItemsInputSchema: z.ZodType<Prisma.MarketListCreateWithoutItemsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutMarketListsInputSchema).optional()
}).strict();

export const MarketListUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.MarketListUncheckedCreateWithoutItemsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  userUid: z.string().optional().nullable()
}).strict();

export const MarketListCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.MarketListCreateOrConnectWithoutItemsInput> = z.object({
  where: z.lazy(() => MarketListWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MarketListCreateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const PriceUpsertWithWhereUniqueWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUpsertWithWhereUniqueWithoutMarketListItemInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PriceUpdateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutMarketListItemInputSchema) ]),
  create: z.union([ z.lazy(() => PriceCreateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedCreateWithoutMarketListItemInputSchema) ]),
}).strict();

export const PriceUpdateWithWhereUniqueWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUpdateWithWhereUniqueWithoutMarketListItemInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateWithoutMarketListItemInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutMarketListItemInputSchema) ]),
}).strict();

export const PriceUpdateManyWithWhereWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUpdateManyWithWhereWithoutMarketListItemInput> = z.object({
  where: z.lazy(() => PriceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateManyMutationInputSchema),z.lazy(() => PriceUncheckedUpdateManyWithoutMarketListItemInputSchema) ]),
}).strict();

export const PriceScalarWhereInputSchema: z.ZodType<Prisma.PriceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  marketListItemId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MarketListUpsertWithoutItemsInputSchema: z.ZodType<Prisma.MarketListUpsertWithoutItemsInput> = z.object({
  update: z.union([ z.lazy(() => MarketListUpdateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedUpdateWithoutItemsInputSchema) ]),
  create: z.union([ z.lazy(() => MarketListCreateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedCreateWithoutItemsInputSchema) ]),
  where: z.lazy(() => MarketListWhereInputSchema).optional()
}).strict();

export const MarketListUpdateToOneWithWhereWithoutItemsInputSchema: z.ZodType<Prisma.MarketListUpdateToOneWithWhereWithoutItemsInput> = z.object({
  where: z.lazy(() => MarketListWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MarketListUpdateWithoutItemsInputSchema),z.lazy(() => MarketListUncheckedUpdateWithoutItemsInputSchema) ]),
}).strict();

export const MarketListUpdateWithoutItemsInputSchema: z.ZodType<Prisma.MarketListUpdateWithoutItemsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutMarketListsNestedInputSchema).optional()
}).strict();

export const MarketListUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.MarketListUncheckedUpdateWithoutItemsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userUid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MarketListItemCreateWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemCreateWithoutPricesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  MarketList: z.lazy(() => MarketListCreateNestedOneWithoutItemsInputSchema).optional()
}).strict();

export const MarketListItemUncheckedCreateWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemUncheckedCreateWithoutPricesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string(),
  marketListId: z.string().optional().nullable()
}).strict();

export const MarketListItemCreateOrConnectWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemCreateOrConnectWithoutPricesInput> = z.object({
  where: z.lazy(() => MarketListItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutPricesInputSchema) ]),
}).strict();

export const MarketListItemUpsertWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemUpsertWithoutPricesInput> = z.object({
  update: z.union([ z.lazy(() => MarketListItemUpdateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedUpdateWithoutPricesInputSchema) ]),
  create: z.union([ z.lazy(() => MarketListItemCreateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedCreateWithoutPricesInputSchema) ]),
  where: z.lazy(() => MarketListItemWhereInputSchema).optional()
}).strict();

export const MarketListItemUpdateToOneWithWhereWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemUpdateToOneWithWhereWithoutPricesInput> = z.object({
  where: z.lazy(() => MarketListItemWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MarketListItemUpdateWithoutPricesInputSchema),z.lazy(() => MarketListItemUncheckedUpdateWithoutPricesInputSchema) ]),
}).strict();

export const MarketListItemUpdateWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemUpdateWithoutPricesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  MarketList: z.lazy(() => MarketListUpdateOneWithoutItemsNestedInputSchema).optional()
}).strict();

export const MarketListItemUncheckedUpdateWithoutPricesInputSchema: z.ZodType<Prisma.MarketListItemUncheckedUpdateWithoutPricesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  marketListId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskCreateManyUserInputSchema: z.ZodType<Prisma.TaskCreateManyUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().optional().nullable(),
  priority: z.string()
}).strict();

export const MarketListCreateManyUserInputSchema: z.ZodType<Prisma.MarketListCreateManyUserInput> = z.object({
  id: z.string().optional(),
  title: z.string()
}).strict();

export const TaskUpdateWithoutUserInputSchema: z.ZodType<Prisma.TaskUpdateWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MarketListUpdateWithoutUserInputSchema: z.ZodType<Prisma.MarketListUpdateWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => MarketListItemUpdateManyWithoutMarketListNestedInputSchema).optional()
}).strict();

export const MarketListUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MarketListUncheckedUpdateWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => MarketListItemUncheckedUpdateManyWithoutMarketListNestedInputSchema).optional()
}).strict();

export const MarketListUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MarketListUncheckedUpdateManyWithoutUserInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MarketListItemCreateManyMarketListInputSchema: z.ZodType<Prisma.MarketListItemCreateManyMarketListInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  weight: z.string().optional().nullable(),
  currency: z.string(),
  brand: z.string()
}).strict();

export const MarketListItemUpdateWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUpdateWithoutMarketListInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutMarketListItemNestedInputSchema).optional()
}).strict();

export const MarketListItemUncheckedUpdateWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUncheckedUpdateWithoutMarketListInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutMarketListItemNestedInputSchema).optional()
}).strict();

export const MarketListItemUncheckedUpdateManyWithoutMarketListInputSchema: z.ZodType<Prisma.MarketListItemUncheckedUpdateManyWithoutMarketListInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  brand: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceCreateManyMarketListItemInputSchema: z.ZodType<Prisma.PriceCreateManyMarketListItemInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  value: z.number().int(),
  unit: z.string()
}).strict();

export const PriceUpdateWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUpdateWithoutMarketListItemInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateWithoutMarketListItemInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyWithoutMarketListItemInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutMarketListItemInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AuthTokenFindFirstArgsSchema: z.ZodType<Prisma.AuthTokenFindFirstArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereInputSchema.optional(),
  orderBy: z.union([ AuthTokenOrderByWithRelationInputSchema.array(),AuthTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthTokenScalarFieldEnumSchema,AuthTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthTokenFindFirstOrThrowArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereInputSchema.optional(),
  orderBy: z.union([ AuthTokenOrderByWithRelationInputSchema.array(),AuthTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthTokenScalarFieldEnumSchema,AuthTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthTokenFindManyArgsSchema: z.ZodType<Prisma.AuthTokenFindManyArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereInputSchema.optional(),
  orderBy: z.union([ AuthTokenOrderByWithRelationInputSchema.array(),AuthTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthTokenScalarFieldEnumSchema,AuthTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuthTokenAggregateArgsSchema: z.ZodType<Prisma.AuthTokenAggregateArgs> = z.object({
  where: AuthTokenWhereInputSchema.optional(),
  orderBy: z.union([ AuthTokenOrderByWithRelationInputSchema.array(),AuthTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthTokenGroupByArgsSchema: z.ZodType<Prisma.AuthTokenGroupByArgs> = z.object({
  where: AuthTokenWhereInputSchema.optional(),
  orderBy: z.union([ AuthTokenOrderByWithAggregationInputSchema.array(),AuthTokenOrderByWithAggregationInputSchema ]).optional(),
  by: AuthTokenScalarFieldEnumSchema.array(),
  having: AuthTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuthTokenFindUniqueArgsSchema: z.ZodType<Prisma.AuthTokenFindUniqueArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereUniqueInputSchema,
}).strict() ;

export const AuthTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthTokenFindUniqueOrThrowArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereUniqueInputSchema,
}).strict() ;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const MarketListFindFirstArgsSchema: z.ZodType<Prisma.MarketListFindFirstArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereInputSchema.optional(),
  orderBy: z.union([ MarketListOrderByWithRelationInputSchema.array(),MarketListOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MarketListScalarFieldEnumSchema,MarketListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MarketListFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MarketListFindFirstOrThrowArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereInputSchema.optional(),
  orderBy: z.union([ MarketListOrderByWithRelationInputSchema.array(),MarketListOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MarketListScalarFieldEnumSchema,MarketListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MarketListFindManyArgsSchema: z.ZodType<Prisma.MarketListFindManyArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereInputSchema.optional(),
  orderBy: z.union([ MarketListOrderByWithRelationInputSchema.array(),MarketListOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MarketListScalarFieldEnumSchema,MarketListScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MarketListAggregateArgsSchema: z.ZodType<Prisma.MarketListAggregateArgs> = z.object({
  where: MarketListWhereInputSchema.optional(),
  orderBy: z.union([ MarketListOrderByWithRelationInputSchema.array(),MarketListOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MarketListGroupByArgsSchema: z.ZodType<Prisma.MarketListGroupByArgs> = z.object({
  where: MarketListWhereInputSchema.optional(),
  orderBy: z.union([ MarketListOrderByWithAggregationInputSchema.array(),MarketListOrderByWithAggregationInputSchema ]).optional(),
  by: MarketListScalarFieldEnumSchema.array(),
  having: MarketListScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MarketListFindUniqueArgsSchema: z.ZodType<Prisma.MarketListFindUniqueArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereUniqueInputSchema,
}).strict() ;

export const MarketListFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MarketListFindUniqueOrThrowArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereUniqueInputSchema,
}).strict() ;

export const MarketListItemFindFirstArgsSchema: z.ZodType<Prisma.MarketListItemFindFirstArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereInputSchema.optional(),
  orderBy: z.union([ MarketListItemOrderByWithRelationInputSchema.array(),MarketListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MarketListItemScalarFieldEnumSchema,MarketListItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MarketListItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MarketListItemFindFirstOrThrowArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereInputSchema.optional(),
  orderBy: z.union([ MarketListItemOrderByWithRelationInputSchema.array(),MarketListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MarketListItemScalarFieldEnumSchema,MarketListItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MarketListItemFindManyArgsSchema: z.ZodType<Prisma.MarketListItemFindManyArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereInputSchema.optional(),
  orderBy: z.union([ MarketListItemOrderByWithRelationInputSchema.array(),MarketListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MarketListItemScalarFieldEnumSchema,MarketListItemScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MarketListItemAggregateArgsSchema: z.ZodType<Prisma.MarketListItemAggregateArgs> = z.object({
  where: MarketListItemWhereInputSchema.optional(),
  orderBy: z.union([ MarketListItemOrderByWithRelationInputSchema.array(),MarketListItemOrderByWithRelationInputSchema ]).optional(),
  cursor: MarketListItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MarketListItemGroupByArgsSchema: z.ZodType<Prisma.MarketListItemGroupByArgs> = z.object({
  where: MarketListItemWhereInputSchema.optional(),
  orderBy: z.union([ MarketListItemOrderByWithAggregationInputSchema.array(),MarketListItemOrderByWithAggregationInputSchema ]).optional(),
  by: MarketListItemScalarFieldEnumSchema.array(),
  having: MarketListItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MarketListItemFindUniqueArgsSchema: z.ZodType<Prisma.MarketListItemFindUniqueArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereUniqueInputSchema,
}).strict() ;

export const MarketListItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MarketListItemFindUniqueOrThrowArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereUniqueInputSchema,
}).strict() ;

export const PriceFindFirstArgsSchema: z.ZodType<Prisma.PriceFindFirstArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema,PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PriceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PriceFindFirstOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema,PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PriceFindManyArgsSchema: z.ZodType<Prisma.PriceFindManyArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema,PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PriceAggregateArgsSchema: z.ZodType<Prisma.PriceAggregateArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PriceGroupByArgsSchema: z.ZodType<Prisma.PriceGroupByArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithAggregationInputSchema.array(),PriceOrderByWithAggregationInputSchema ]).optional(),
  by: PriceScalarFieldEnumSchema.array(),
  having: PriceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PriceFindUniqueArgsSchema: z.ZodType<Prisma.PriceFindUniqueArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict() ;

export const PriceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PriceFindUniqueOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthTokenCreateArgsSchema: z.ZodType<Prisma.AuthTokenCreateArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  data: z.union([ AuthTokenCreateInputSchema,AuthTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const AuthTokenUpsertArgsSchema: z.ZodType<Prisma.AuthTokenUpsertArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereUniqueInputSchema,
  create: z.union([ AuthTokenCreateInputSchema,AuthTokenUncheckedCreateInputSchema ]),
  update: z.union([ AuthTokenUpdateInputSchema,AuthTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuthTokenCreateManyArgsSchema: z.ZodType<Prisma.AuthTokenCreateManyArgs> = z.object({
  data: z.union([ AuthTokenCreateManyInputSchema,AuthTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const AuthTokenDeleteArgsSchema: z.ZodType<Prisma.AuthTokenDeleteArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  where: AuthTokenWhereUniqueInputSchema,
}).strict() ;

export const AuthTokenUpdateArgsSchema: z.ZodType<Prisma.AuthTokenUpdateArgs> = z.object({
  select: AuthTokenSelectSchema.optional(),
  include: AuthTokenIncludeSchema.optional(),
  data: z.union([ AuthTokenUpdateInputSchema,AuthTokenUncheckedUpdateInputSchema ]),
  where: AuthTokenWhereUniqueInputSchema,
}).strict() ;

export const AuthTokenUpdateManyArgsSchema: z.ZodType<Prisma.AuthTokenUpdateManyArgs> = z.object({
  data: z.union([ AuthTokenUpdateManyMutationInputSchema,AuthTokenUncheckedUpdateManyInputSchema ]),
  where: AuthTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuthTokenDeleteManyArgsSchema: z.ZodType<Prisma.AuthTokenDeleteManyArgs> = z.object({
  where: AuthTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MarketListCreateArgsSchema: z.ZodType<Prisma.MarketListCreateArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  data: z.union([ MarketListCreateInputSchema,MarketListUncheckedCreateInputSchema ]),
}).strict() ;

export const MarketListUpsertArgsSchema: z.ZodType<Prisma.MarketListUpsertArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereUniqueInputSchema,
  create: z.union([ MarketListCreateInputSchema,MarketListUncheckedCreateInputSchema ]),
  update: z.union([ MarketListUpdateInputSchema,MarketListUncheckedUpdateInputSchema ]),
}).strict() ;

export const MarketListCreateManyArgsSchema: z.ZodType<Prisma.MarketListCreateManyArgs> = z.object({
  data: z.union([ MarketListCreateManyInputSchema,MarketListCreateManyInputSchema.array() ]),
}).strict() ;

export const MarketListDeleteArgsSchema: z.ZodType<Prisma.MarketListDeleteArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  where: MarketListWhereUniqueInputSchema,
}).strict() ;

export const MarketListUpdateArgsSchema: z.ZodType<Prisma.MarketListUpdateArgs> = z.object({
  select: MarketListSelectSchema.optional(),
  include: MarketListIncludeSchema.optional(),
  data: z.union([ MarketListUpdateInputSchema,MarketListUncheckedUpdateInputSchema ]),
  where: MarketListWhereUniqueInputSchema,
}).strict() ;

export const MarketListUpdateManyArgsSchema: z.ZodType<Prisma.MarketListUpdateManyArgs> = z.object({
  data: z.union([ MarketListUpdateManyMutationInputSchema,MarketListUncheckedUpdateManyInputSchema ]),
  where: MarketListWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MarketListDeleteManyArgsSchema: z.ZodType<Prisma.MarketListDeleteManyArgs> = z.object({
  where: MarketListWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MarketListItemCreateArgsSchema: z.ZodType<Prisma.MarketListItemCreateArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  data: z.union([ MarketListItemCreateInputSchema,MarketListItemUncheckedCreateInputSchema ]),
}).strict() ;

export const MarketListItemUpsertArgsSchema: z.ZodType<Prisma.MarketListItemUpsertArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereUniqueInputSchema,
  create: z.union([ MarketListItemCreateInputSchema,MarketListItemUncheckedCreateInputSchema ]),
  update: z.union([ MarketListItemUpdateInputSchema,MarketListItemUncheckedUpdateInputSchema ]),
}).strict() ;

export const MarketListItemCreateManyArgsSchema: z.ZodType<Prisma.MarketListItemCreateManyArgs> = z.object({
  data: z.union([ MarketListItemCreateManyInputSchema,MarketListItemCreateManyInputSchema.array() ]),
}).strict() ;

export const MarketListItemDeleteArgsSchema: z.ZodType<Prisma.MarketListItemDeleteArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  where: MarketListItemWhereUniqueInputSchema,
}).strict() ;

export const MarketListItemUpdateArgsSchema: z.ZodType<Prisma.MarketListItemUpdateArgs> = z.object({
  select: MarketListItemSelectSchema.optional(),
  include: MarketListItemIncludeSchema.optional(),
  data: z.union([ MarketListItemUpdateInputSchema,MarketListItemUncheckedUpdateInputSchema ]),
  where: MarketListItemWhereUniqueInputSchema,
}).strict() ;

export const MarketListItemUpdateManyArgsSchema: z.ZodType<Prisma.MarketListItemUpdateManyArgs> = z.object({
  data: z.union([ MarketListItemUpdateManyMutationInputSchema,MarketListItemUncheckedUpdateManyInputSchema ]),
  where: MarketListItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MarketListItemDeleteManyArgsSchema: z.ZodType<Prisma.MarketListItemDeleteManyArgs> = z.object({
  where: MarketListItemWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PriceCreateArgsSchema: z.ZodType<Prisma.PriceCreateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceCreateInputSchema,PriceUncheckedCreateInputSchema ]),
}).strict() ;

export const PriceUpsertArgsSchema: z.ZodType<Prisma.PriceUpsertArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
  create: z.union([ PriceCreateInputSchema,PriceUncheckedCreateInputSchema ]),
  update: z.union([ PriceUpdateInputSchema,PriceUncheckedUpdateInputSchema ]),
}).strict() ;

export const PriceCreateManyArgsSchema: z.ZodType<Prisma.PriceCreateManyArgs> = z.object({
  data: z.union([ PriceCreateManyInputSchema,PriceCreateManyInputSchema.array() ]),
}).strict() ;

export const PriceDeleteArgsSchema: z.ZodType<Prisma.PriceDeleteArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict() ;

export const PriceUpdateArgsSchema: z.ZodType<Prisma.PriceUpdateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceUpdateInputSchema,PriceUncheckedUpdateInputSchema ]),
  where: PriceWhereUniqueInputSchema,
}).strict() ;

export const PriceUpdateManyArgsSchema: z.ZodType<Prisma.PriceUpdateManyArgs> = z.object({
  data: z.union([ PriceUpdateManyMutationInputSchema,PriceUncheckedUpdateManyInputSchema ]),
  where: PriceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PriceDeleteManyArgsSchema: z.ZodType<Prisma.PriceDeleteManyArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;