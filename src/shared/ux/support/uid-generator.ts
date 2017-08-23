export class UidGenerator {
    private last: {[prefix: string]: number} = {};

    public generate(prefix: string = '') {
        if (!this.last.hasOwnProperty(prefix)) {
            this.last[prefix] = 0;
        }

        return 'ux_' + (prefix ? prefix + '_' : '') + (++this.last[prefix]);
    }
}