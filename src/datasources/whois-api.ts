import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class WHOISAPI extends RESTDataSource {
  override baseURL = "https://www.whoisxmlapi.com/whoisserver/";

  constructor(options: { cache: KeyValueCache }) {
    super(options);
  }

  async getDomainInfo(domainName: string) {
    const { WhoisRecord } = await this.get(`WhoisService?`, {
      params: {
        apiKey: process.env.WHOIS_API_KEY,
        domainName: domainName,
        ip: "1",
        da: "1",
        outputFormat: "JSON",
      },
    });

    if (isIPV4(domainName) || isIPV6(domainName)) {
      return formatIPData(WhoisRecord);
    }

    return formatDomainNameData(WhoisRecord);
  }
}

function isIPV6(str: String) {
  return str.includes(":");
}

function isIPV4(str: String) {
  return str.split(".").every((val: string) => {
    const numVal = parseInt(val);
    return Number.isInteger(numVal) && numVal >= 0 && numVal <= 255;
  });
}

function formatDomainNameData(data: any) {
  const {
    createdDateNormalized,
    updatedDateNormalized,
    expiresDateNormalized,
    registrant,
    domainName,
    registrarName,
    registrarIANAID,
    ips: [ip],
    domainAvailability,
  } = data;

  return {
    createdDate: createdDateNormalized,
    updatedDate: updatedDateNormalized,
    expiresDate: expiresDateNormalized,
    organization: registrant.organization,
    state: registrant.state,
    country: registrant.country,
    countryCode: registrant.countryCode,
    domainName,
    registrarName,
    registrarIANAID,
    ip,
    domainAvailability,
  };
}

function formatIPData(data: any) {
  const {
    domainName,
    registrarName,
    registrarIANAID,
    ips: [ip],
    domainAvailability,
  } = data;

  const { createdDateNormalized, updatedDateNormalized, registrant } =
    data.registryData;

  return {
    createdDate: createdDateNormalized,
    updatedDate: updatedDateNormalized,
    expiresDate: "",
    organization: registrant.organization,
    state: registrant.state,
    country: registrant.country,
    countryCode: registrant.countryCode,
    domainName,
    registrarName,
    registrarIANAID,
    ip,
    domainAvailability,
  };
}
