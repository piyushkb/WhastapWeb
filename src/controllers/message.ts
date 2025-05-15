import { Hono } from "hono";
import { createKeyMiddleware } from "../middlewares/key.middleware";
import { customValidator } from "../middlewares/validation.middleware";
import { z } from "zod";
import * as whatsapp from "wa-multi-session";
import { HTTPException } from "hono/http-exception";

export const createMessageController = () => {
    const app = new Hono();

    // Schema for validating message payload
    const sendMessageSchema = z.object({
        session: z.string(),
        to: z.string(),
        message: z.string(),
    });

    // Route to send a text message
    app.post(
        "/send-text",
        createKeyMiddleware(),
        customValidator("json", sendMessageSchema),
        async (context) => {
            const payload = context.req.valid("json");
            const sessionExists = whatsapp.getSession(payload.session);
            if (!sessionExists) {
                throw new HTTPException(400, {
                    message: "Session does not exist",
                });
            }

            const response = await whatsapp.sendTextMessage({
                sessionId: payload.session,
                to: payload.to,
                text: payload.message,
            });

            return context.json({ data: response });
        }
    );

    // Route to send an image message
    app.post(
        "/send-image",
        createKeyMiddleware(),
        customValidator(
            "json",
            sendMessageSchema.merge(
                z.object({
                    image: z.string().url(), // Expecting a valid image URL
                })
            )
        ),
        async (context) => {
            const payload = context.req.valid("json");
            const sessionExists = whatsapp.getSession(payload.session);
            if (!sessionExists) {
                throw new HTTPException(400, {
                    message: "Session does not exist",
                });
            }

            const response = await whatsapp.sendImage({
                sessionId: payload.session,
                to: payload.to,
                text: payload.message, // Optional caption
                media: payload.image, // URL passed directly as media
            });

            return context.json({ data: response });
        }
    );

    // Route to send a document
    app.post(
        "/send-document",
        createKeyMiddleware(),
        customValidator(
            "json",
            sendMessageSchema.merge(
                z.object({
                    document: z.string().url(), // Expecting a valid document URL
                    document_name: z.string(), // Name for the document
                })
            )
        ),
        async (context) => {
            const payload = context.req.valid("json");
            const sessionExists = whatsapp.getSession(payload.session);
            if (!sessionExists) {
                throw new HTTPException(400, {
                    message: "Session does not exist",
                });
            }

            const response = await whatsapp.sendDocument({
                sessionId: payload.session,
                to: payload.to,
                text: payload.message, // Optional caption
                media: payload.document, // URL passed directly as media
                filename: payload.document_name, // Document file name
            });

            return context.json({ data: response });
        }
    );

    // Route to send a video message
    app.post(
        "/send-video",
        createKeyMiddleware(),
        customValidator(
            "json",
            sendMessageSchema.merge(
                z.object({
                    video: z.string().url(), // Expecting a valid video URL
                })
            )
        ),
        async (context) => {
            const payload = context.req.valid("json");
            const sessionExists = whatsapp.getSession(payload.session);
            if (!sessionExists) {
                throw new HTTPException(400, {
                    message: "Session does not exist",
                });
            }

            const response = await whatsapp.sendVideo({
                sessionId: payload.session,
                to: payload.to,
                text: payload.message, // Optional caption
                media: payload.video, // URL passed directly as media
            });

            return context.json({ data: response });
        }
    );

    return app;
};
