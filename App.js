import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
  let [cep, setCep] = useState('');
  let [dados, setDados] = useState([]);
  
  const [expanded, setExpanded] = useState(false);
  const handlePress = () =>{ setExpanded(!expanded)};
  const [selectedValue, setSelectedValue] = useState(null);


   
  const handleItemPress = (value) => {
    setSelectedValue(value);
    setExpanded(false); 
  };


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
          setSelectedValue(dados.uf);
        }
      ).catch(
        // erro a ser tratado modal
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
      <List.Section title="Estado" >
        <List.Accordion  
        title={ selectedValue == null ? 'Selecione o Estado': selectedValue  } 
          expanded ={expanded}
          onPress={handlePress}


        >
          <List.Item title="AC"  onPress={()=> {handleItemPress('AC')}}/>
          <List.Item title="SP" onPress={()=> {handleItemPress('SP')}} />
          <List.Item title="RJ"  onPress={()=> {handleItemPress('RJ')}}/>
          <List.Item title="BH" onPress={()=> {handleItemPress('BH')}} />
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
