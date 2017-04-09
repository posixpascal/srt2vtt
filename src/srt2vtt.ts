export const srt2vtt = (input:string) => {
    const parser = new SRTParser();
    parser.load(input);
    const chunks = parser.getTracks().filter(track => track.hasBody()).map(track => track.toWebVTT())
    return [
        'WEBVTT',
        '',
        `${chunks.join("\n\n")}`].join("\n");
}

class SRTParser {
    static INDEX_REGEX = /^\d+$/ig;
    private tracks : SRTTrack[] = [];

    constructor(){}
    public getTracks(){
        return this.tracks;
    }
    public load(source:string){
        source = source.replace(/(\r\n)/g, '\n');
        const chunks = source.split("\n\n");
        this.tracks = chunks.map(chunk => SRTTrack.fromChunk(chunk));
    }
}

class SRTTrack {
    public index : number = 0;
    public message : string = "";
    public range : SRTTimeRange;
    constructor(){}

    hasBody(){
        return this.message.trim() && this.message.trim() !== "."
    }

    public toWebVTT(){
        // format: HH:MM:SS.millis
        const startTime = `${this.range.start.hours}:${this.range.start.minutes}:${this.range.start.seconds}.${this.range.start.millis}`;
        const endTime = `${this.range.end.hours}:${this.range.end.minutes}:${this.range.end.seconds}.${this.range.end.millis}`;
        return [
            `${startTime} --> ${endTime}`,
            `${this.message}`
        ].join("\n");
    }

    static fromChunk(chunk: string){
        const track = new SRTTrack();
        let parts = chunk.split('\n');
        track.index = parseInt(parts.shift(), 10);
    
        const time = parts.shift();
        track.range = SRTTimeRange.fromString(time);

        track.message = parts.join("\n");
        return track;
    }
}

class SRTTimeRange {
    constructor(public start : Time, public end : Time){
        
    }
    static fromString(timerange : string){
        let [start, end] = timerange.split(' --> ').map(time => SRTTimeRange.parseTime(time));
        return new SRTTimeRange(start, end);
    }

    static parseTime(time:string){
        let millis;
        let [hours, minutes, seconds] = time.split(':').map(str => str.trim());
        [seconds, millis] = seconds.split(',');
        
        return {
            hours,
            minutes,
            seconds,
            millis
        }
    }
}

interface Time {
    hours: string;
    minutes: string;
    seconds: string;
    millis: string;
}