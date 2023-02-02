import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class WHOISAPI extends RESTDataSource {
  override baseURL = "https://www.whoisxmlapi.com/whoisserver/";

  constructor(options: { cache: KeyValueCache }) {
    super(options);
  }

  async getDomainInfo(domainName: string) {
    const res = this.get(
      `WhoisService?apiKey=${process.env.WHOIS_API_KEY}&domainName=${domainName}&outputFormat=JSON` // path
    );

    return res;
  }
}
