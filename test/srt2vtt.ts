import { expect } from 'chai';
import { srt2vtt }  from "../src/srt2vtt";
import * as fs from "fs";
describe('srt2vtt', () => {
    it('should load an srt file', () => {
        srt2vtt(fs.readFileSync("./test/example.srt").toString());
        expect(1).to.be.greaterThan(0);
    });
})