# Setting Up a Human-Readable BOLT12 Offer

## Summary and Implementation Guide

After following Seth for Privacy's guide on setting up a Bitcoin username, we've created a comprehensive
guide that documents the process of creating a human-readable BOLT12 offer using Core Lightning and
setting it up with a DNS record according to BIP353.

## Key Observations

- BOLT12 offers combined with DNS records provide a user-friendly way to receive Bitcoin payments
- The implementation requires Core Lightning with experimental features enabled
- The DNS setup follows the BIP353 specification for linking usernames to payment options
- This approach balances decentralization with improved usability

## Implementation Steps

1. **Configure Core Lightning** with experimental features:
   ```
   lightningd --enable-experimental-offers --bitcoin-rpcuser=user --bitcoin-rpcpassword=password ...
   ```
   Or in config file (`~/.lightning/config`):
   ```
   enable-experimental-offers=true
   network=bitcoin
   bitcoin-rpcuser=your_username
   bitcoin-rpcpassword=your_password
   ...
   ```

2. **Generate a BOLT12 Offer** using the Core Lightning CLI:
   ```
   lightning-cli offer any description="Payments to Your Name"
   ```
   Output will include a BOLT12 string like:
   ```json
   {
     "offer_id": "7d8e62146905b9c3a7a944fd6a89f34c6f54c18ba19ab989de2e5ac2a3cc4654",
     "active": true,
     "single_use": false,
     "bolt12": "lno1pg0pu..."
   }
   ```

3. **Create DNS TXT Record** following BIP353 format:
   If your username is "satoshi" and domain is "example.com", create a TXT record for:
   ```
   _bitcoin._username.example.com
   ```
   With value:
   ```
   bolt12=lno1pg0pu...
   ```
   Where "lno1pg0pu..." is the BOLT12 offer you generated.

4. **Verify DNS Setup** with `dig` command:
   ```
   dig TXT _bitcoin._username.yourdomain.com
   ```
   Successful output should include:
   ```
   ;; ANSWER SECTION:
   _bitcoin._username.example.com. 3600 IN TXT "bolt12=lno1pg0p..."
   ```

5. **Test Your Bitcoin Username** with compatible wallets:
   With Core Lightning:
   ```
   lightning-cli decode username@yourdomain.com
   ```
   This should resolve to your BOLT12 offer:
   ```json
   {
     "type": "bolt12 offer",
     "bolt12": "lno1pg0pu...",
     "description": "Payments to Your Name",
     "valid": true
   }
   ```

## Compatibility

This approach currently works with:
- Core Lightning CLI
- Phoenix Wallet
- Other BOLT12-compatible wallets

As BOLT12 adoption increases, this method will become more widely supported across wallets
and services.

## Next Steps

This implementation provides a foundation for human-readable Bitcoin addresses. Future improvements
could include:
- Integration with other Lightning implementations
- Streamlining the DNS setup process
- Developing more user-friendly tools for general users

## References

- [Seth for Privacy's Guide on Setting up a Bitcoin Username](https://sethforprivacy.com/guides/setting-up-a-bitcoin-username/)
- [BIP353 Specification](https://github.com/bitcoin/bips/blob/master/bip-0353.mediawiki)
- [BOLT12 Documentation](https://bolt12.org/)
- [Core Lightning Offer Command Reference](https://docs.corelightning.org/reference/offer)
