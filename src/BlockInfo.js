import React, { useEffect, useState } from "react";
import { Card, Grid, Table } from "semantic-ui-react";

import { useSubstrate } from "./substrate-lib";

function BlockInfo(props) {
  const { api } = useSubstrate();
  const [blockInfo, setBlockInfo] = useState();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const block = await api.rpc.chain.getHeader();
        setBlockInfo(block);
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
  }, [api.rpc.chain, blockInfo]);

  return blockInfo ? (
    <Grid.Column>
      <Card fluid>
        <Card.Content>
          <Card.Header>Block info</Card.Header>
          <Card.Description>
            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Number</Table.Cell>
                  <Table.Cell>{blockInfo.number.toString()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Hash</Table.Cell>
                  <Table.Cell>{blockInfo.hash.toString()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Parent hash</Table.Cell>
                  <Table.Cell>{blockInfo.parentHash.toString()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>State root</Table.Cell>
                  <Table.Cell>{blockInfo.stateRoot.toString()}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Extrincis root</Table.Cell>
                  <Table.Cell>{blockInfo.extrinsicsRoot.toString()}</Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://polkadot.subscan.io/block/${blockInfo.number.toString()}`}
                    >
                      View on subscan
                    </a>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  ) : null;
}

export default function NodeInfo(props) {
  const { api } = useSubstrate();
  return api.rpc && api.rpc.chain ? <BlockInfo {...props} /> : null;
}
