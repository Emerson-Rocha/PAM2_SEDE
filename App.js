import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
  let [cep, setCep] = useState('');
  let [dados, setDados] = useState([]);

  const BuscaCep = (xcep) => {
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then(
        (resp) => { return resp.json() }
      )
      .then(
        (dados) => {
          console.log(dados);
          setDados(dados);
        }
      ).catch(
        (x) => { console.log(x) }
      )
  }


  return (

    <View style={styles.container}>
      <TextInput
        label='CEP'
        onChangeText={(value) => { setCep(value) }}
        mode='outlined'
        keyboardType='numeric'
        onBlur={() => { BuscaCep(cep) }}
      />

      <TextInput
        label='Rua'
        value={dados.logradouro}
        onChangeText={(value) => {
          setCep(dados.logradouro = value)
        }}
        mode='outlined'

      />

      <TextInput
        label='Numero'
        mode='outlined' />

      <TextInput
        label='Complemento'
        mode='outlined' />
      <TextInput
        label='Bairro'
        mode='outlined'
        value={dados.bairro}
        onChangeText={(value) => { setDados(dados.bairro = value) }}
      />

      <TextInput
        label='Cidade'
        mode='outlined'
        value={dados.localidade}
        onChangeText={(value) => { setDados(dados.localidade = value) }}
      />
      <List.Section title="Estado">
        <List.Accordion  title="Selecione o Estado">
          <List.Item title="estado 1" />
          <List.Item title="estado 2" />
          <List.Item title="estado 3" />
          <List.Item title="estado 4" />
        </List.Accordion>
      </List.Section>

      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30

  },
});
