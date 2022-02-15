import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import sad from './assets/sad.json'
import hash from './assets/hash.json'
import victory from './assets/victory.json'
import Lottie from 'lottie-react-native'
import {useState} from 'react'

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');
  const [animation, setAnimation] = useState(true);

  function inciarJogo(jogador){
    setJogadorAtual(jogador)
    setJogadasRestantes(9)
    setTabuleiro([
      ['','','',],
      ['','','',],
      ['','','',],
    ])
    setTela('jogo')
  }

  function jogar(linha, coluna){
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([
      ...tabuleiro
    ])
    setJogadorAtual(jogadorAtual === 'X'? 'O':'X')

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna){
    // validando colunas
    if(tabuleiro[linha][0]!=='' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]){
      return finalizarJogo(tabuleiro[linha][0])
    }
  //validando linhas
    if(tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]){
      return finalizarJogo(tabuleiro[0][coluna])
    }
    // validando diagonais
    if(tabuleiro[0][0]!=='' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] ===tabuleiro[2][2]){
      return finalizarJogo(tabuleiro[0][0])
    }
    if(tabuleiro[0][2]!=='' && tabuleiro[0][2] === tabuleiro[1][1] &&  tabuleiro[1][1] === tabuleiro[2][0]){
      return finalizarJogo(tabuleiro[0][2])
    }
    //nenhum ganhador
    if((jogadasRestantes -1) === 0){
      return finalizarJogo('')
    }
    //jogo não finalizado
    setJogadasRestantes((jogadasRestantes - 1))
  }

  function finalizarJogo(jogador){
    setGanhador(jogador)
    setTela('ganhador')
  }

  switch(tela){
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador' :
      return getTelaGanhador();
  }
  function getTelaMenu(){
    setTimeout(function(){setAnimation(false)}, 1600)
    return (
      <SafeAreaView style={styles.container}>
        {
          animation ? 
          (<Lottie  resizeMode="center" autoSize source={hash} autoPlay loop />)
          :
          ( <View>
                   <StatusBar style="auto" />
        <Text style={styles.titulo}>jogo da velha</Text>
        <Text style={styles.subTitulo}>Selecione o jogador</Text>
        <View style={styles.inLineItems}>
         <TouchableOpacity 
          onPress={()=> inciarJogo('X')}
          style={styles.boxJogador}
         >
        <Text style={styles.jogadorX}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.boxJogador}
         onPress={()=> inciarJogo('O')}
         >
          <Text style={styles.jogadorO}>O</Text>
        </TouchableOpacity>
        </View>
          </View>)
        }
      </SafeAreaView>
    );
  }
  function getTelaJogo(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>jogo da velha</Text>
        {
          tabuleiro.map((linha, numeroLinha)=> {
            return(
              <View key={numeroLinha} style={styles.inLineItems}>
                {
                  linha.map((coluna, numeroColuna)=>{
                    return(
                      <TouchableOpacity
                      key={numeroColuna}
                      style={styles.boxJogador}
                      onPress={()=> jogar(numeroLinha, numeroColuna)}
                      disabled={coluna !== ''}
                      >
                       <Text style={ coluna==='X'? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                     </TouchableOpacity>
                    )
                  })
                }
                
              </View>
            )
          })
        }
        <View style={styles.boxJogadorAtual}>
          <Text > O jogador da vez é</Text>
          <Text style={ jogadorAtual ==='X'? styles.jogadorDaVezX : styles.jogadorDaVezO}>
              {jogadorAtual}
            </Text>
        </View>
        <TouchableOpacity 
        onPress={() => setTela('menu')}
        style={styles.botaoMenu}>
          <Text style={styles.textbotaoMenu}>
          Voltar ao menu
          </Text>

        </TouchableOpacity>
      </View>
    );
  }
  function getTelaGanhador(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>jogo da velha</Text>
        <Text style={styles.subTitulo}>Resultado final</Text>
        {
          ganhador === '' &&
          <>
            <View style={styles.sad}>
              <Lottie  resizeMode="cover" autoSize source={sad} autoPlay loop />
            </View>
            <Text style={styles.ganhador}>
              nenhume ganhador
            </Text>
          </>
        }
        {
          ganhador !== '' &&
          <>
            <View style={styles.victory}>
              <Lottie  resizeMode="cover" autoSize source={victory} autoPlay loop />
            </View>
            <Text style={styles.ganhador}>
              Ganhador
              </Text>
              <View
              style={styles.boxJogador}
              >
              <Text style={ ganhador==='X'? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }
        <TouchableOpacity 
        onPress={() => setTela('menu')}
        style={styles.botaoMenu}>
          <Text style={styles.textbotaoMenu}>
          Voltar ao menu
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
      fontSize:30,
      fontWeight:'bold',
      color: "#333",
      marginBottom:30,
      textAlign:'center'
  },
  subTitulo:{
      fontSize:20,
      color: "#555",
      marginTop:20,
      textAlign:'center'
  },
  boxJogador:{
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    alignItems:'center',
    justifyContent:'center',
    margin: 5,
    borderRadius:10
  },
  jogadorX:{
    fontSize:40,
    color: "#553fda",
  },
  jogadorO:{
    fontSize:40,
    color: "#da3f3f",
  },
  inLineItems:{
    flexDirection:'row',

  },
  botaoMenu:{
    marginTop:20,
  },
  textbotaoMenu:{
    color: "#4e6fe4",
  },
  ganhador:{
    fontSize:25,
    fontWeight:'bold',  
    color: "#333",
  },
  victory:{
    height:100,
  },
  sad:{
    height:200,
  },
  jogadorDaVezX:{
    fontSize:20,
    color: "#553fda",
    margin: 9,

  },
  jogadorDaVezO:{
    fontSize:20,
    color: "#da3f3f",
    margin: 9,
  },
  boxJogadorAtual:{
    borderLeftColor:'#00CC99',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius:20,
    padding: 4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});
