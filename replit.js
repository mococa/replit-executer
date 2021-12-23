import { Crosis } from "crosis4furrets";
export class Replit {
  client = null;
  crosis = null;
  static config(sid, replitId) {
    this.sid = sid;
    this.replitId = replitId;
    return this;
  }
  static async connect() {
    const crosis = new Crosis(this.sid, this.replitId);
    await crosis.connect();
    const { client } = crosis;
    this.client = client;
    this.crosis = crosis;
    return this;
  }
  static async restart() {
    return await this.exec("sh ./restart.sh", true);
  }
  static async exec(command, closeAfter) {
    const self = this;
    return new Promise((res, reject) => {
      self.client.openChannel({ service: "exec" }, function open({ channel }) {
        if (!channel) return reject("No channel found");

        channel.onCommand((cmd) => {
          if (cmd.output) {
            console.log(cmd.output);
            return res(cmd.output);
          }
          if (closeAfter && cmd.ok) return self.close();
          return self;
        });

        channel.send({
          exec: { args: command.split(" ") },
          blocking: true,
        });
      });
    });
  }
  static close() {
    return this.crosis.close();
  }
}
