import React, { useState, useEffect } from "react";

import {
  Menu,
  Button,
  Dropdown,
  Container,
  Icon,
  Image,
  Label,
  Input,
} from "semantic-ui-react";

import { useSubstrate } from "./substrate-lib";

function Main(props) {
  const { keyring } = useSubstrate();
  const { setAccountAddress } = props;
  const [accountSelected, setAccountSelected] = useState("");

  const keyringOptions = [
    {
      key: "wss://rpc.polkadot.io",
      value: "wss://rpc.polkadot.io",
      text: "Polkadot",
    },
    {
      key: "wss://kusama-rpc.polkadot.io",
      value: "wss://kusama-rpc.polkadot.io",
      text: "Kusama",
    },
    {
      key: "ws://127.0.0.1:9944",
      value: "ws://127.0.0.1:9944",
      text: "localhost",
    },
  ];

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : "";

  // Set the initial address
  useEffect(() => {
    // setAccountAddress(initialAddress);
    setAccountSelected(initialAddress);
  }, [setAccountAddress, initialAddress]);

  const onChange = (address) => {
    // Update state with new account address
    // setAccountAddress(address);
    setAccountSelected(address);
  };

  return (
    <Menu
      attached="top"
      tabular
      style={{
        backgroundColor: "#fff",
        borderColor: "#fff",
        paddingTop: "1em",
        paddingBottom: "1em",
      }}
    >
      <Container>
        <Menu.Menu>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/substrate-logo.png`}
            size="mini"
          />
        </Menu.Menu>
        <Menu.Menu position="right" style={{ alignItems: "center" }}>
          {/* <Input
            action={
              <Dropdown
                button
                basic
                floating
                placeholder="Select a network"
                options={keyringOptions}
                onChange={(_, dropdown) => {
                  onChange(dropdown.value);
                }}
                value={accountSelected}
              />
            }
            value={accountSelected}
            placeholder="Search..."
          /> */}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default function AccountSelector(props) {
  const { api, keyring } = useSubstrate();
  return keyring.getPairs && api.query ? <Main {...props} /> : null;
}
