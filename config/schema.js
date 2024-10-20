import { boolean, integer, json, serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl'),
    subscription: boolean('subscription').default(false),
    credits: integer('credits').default(30) // 30 credits = 3 videos
})

export const VideoData = pgTable('videoData', {
    id: serial('id').primaryKey(),
    script: json('script').notNull(),
    audioFileUrl: varchar('audioFileUrl').notNull(),
    caption: json('caption').notNull(),
    imageList: varchar('imageList').array(),
    createdBy: varchar('createdBy').notNull(),

})

