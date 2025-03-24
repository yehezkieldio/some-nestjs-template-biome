import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types";
import { AppModule } from "#/app.module";
import { AppService } from "#/app.service";

describe("AppController (e2e)", () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AppService]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/health (GET)", () => {
        return request(app.getHttpServer()).get("/health").expect(200).expect({
            status: "ok"
        });
    });
});
