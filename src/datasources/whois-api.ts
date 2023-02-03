import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class WHOISAPI extends RESTDataSource {
  // baseURL for WHOIS API
  override baseURL = "https://www.whoisxmlapi.com/whoisserver/";

  constructor(options: { cache: KeyValueCache }) {
    super(options);
  }

  // Query domain info from WHOIS API
  // Note: Make sure you set WHOIS_API_KEY in .env file
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

// Check if input is IPV6 format - x:x:x:x:x:x:x:x
function isIPV6(str: String) {
  return str.includes(":");
}

// Check if input is IPV4 format - x.x.x.x
function isIPV4(str: String) {
  return str.split(".").every((val: string) => {
    const numVal = parseInt(val);
    return Number.isInteger(numVal) && numVal >= 0 && numVal <= 255;
  });
}

// Standardize data from WHOIS API when input is a domain name like (google.com, apple.com, cyderes.com, etc)
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

// Standardize data from WHOIS API when input is an IPV4V6 address like (192.0.2.126 or 0:0:0:0:0:ffff:192.1.56.10)
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
