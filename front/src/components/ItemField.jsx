import React,{useState,useEffect,useRef} from "react";

//テストのデータ
const testData= 
[{ id:1, name:"冷蔵庫", description: "SHARPのH１冷蔵庫です。退寮のためお譲りします。新品購入して使用期間は１年間です。", is_waiting: false, comment:"入力フォームの内容" } ,
 { id:2, name:"電子レンジ",description: "HITACHIのH1電子レンジです。退寮のためお譲りします。新品購入して使用期間は3年間です。",is_waiting: true, comment:"" },
 { id:3, name:"空気入れ",description:"ブリジストンの高級空気入れです。車のタイヤの空気も入れられます。退寮のためお譲りします。譲り物のため使用期間は不明です", is_waiting: true, comment:"" },
]
// [{"id":1,"isWaiting":true,"item":"ルンバ","itemExp":"少し傷があります","seller":"木下　信男","comment":" "},{"id":2,"isWaiting":true,"item":"エアコン","itemExp":"新品同様","seller":"森　真一","comment":" "},{"id":3,"isWaiting":false,"item":"アイロン","itemExp":"購入後２回くらい使用","seller":"木村","comment":"とても良いアイロン有難うございました。新品同様でとても気に入りました。大切に使わせていただきます。"},{"id":4,"isWaiting":true,"item":"ポット","itemExp":"新品同様です","seller":"森　真一","comment":""},{"id":5,"isWaiting":true,"item":"椅子","itemExp":"新品同様","seller":"Tiger Woods","comment":""},{"id":6,"isWaiting":true,"item":"ベッド","itemExp":"少し傷ありですが、とても綺麗だと思います。","seller":"Tom Smith","comment":""},{"id":7,"isWaiting":true,"item":"レンジ","itemExp":"購入後１年程度使用","seller":"高木　光一","comment":" "},{"id":8,"isWaiting":false,"item":"冷蔵庫","itemExp":"結構冷えが悪いです","seller":"森　洋平","comment":"５００００円で購入していただきました/n/¥廃棄代金が浮いたので大助かりです！"}]

export const ItemField =(props)=>{
    const { className1,className2,className3,className4,className5 } = props;
    const [items, setItems] = useState(testData);
    const ref = useRef("");
    const URL = "http://localhost:8080/table";

    useEffect(()=>{
        fetch(URL, {method: "GET"})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setItems(data)
        })
    }, [])
    const label = "部屋番号・氏名・今日の日付を入力し、譲渡依頼してください"
    const clickAction = (e) =>{
        const id = e.target.id;
        const comment = document.getElementById(`input${id}`).value;
        const body = {"id": id, "comment": comment};
        console.log(id);
        console.log(comment);
        // https://postsrc.com/code-snippets/how-to-make-patch-request-with-fetch-api
        fetch(`${URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
        }).then((response) => {
            console.log("try");
            console.log(response.body)})
        .then(window.location.reload());
    }
    const itemView = () => {
        const elementsArr = [];
        items.forEach((item, index) => {
            elementsArr.push(
                <tr>
                <td className={className1}>{item.id}</td>
                <td className={className2}>{item.item}</td>
                <td className={className3}>{item.itemExp}</td>
                <td className={className4}>{item.isWaiting? "譲渡可" : "新しい持ち主のもとへ旅立ちました ﾉｼ"}<br/>{item.is_waiting? "" : item.comment}</td>
                {item.isWaiting && <td className={className5}>
                    {/* <button id={item.id} onClick={clickAction}>譲渡依頼</button> */}
                    <label>{label}</label><br/>
                    <input ref={ref} id={`input${item.id}`} className="comment" type="text" placeholder="※改行不可" required></input>
                    <button id={item.id} onClick={clickAction}>譲渡依頼</button>
                </td>}
                </tr>
            )
        })
        return elementsArr;
    }
    const resultElements = itemView();
    return resultElements
}


//   <tr>
//   <td>ID</td>
//   <td>商品名</td>
//   <td>商品説明</td>
//   <td>ステータス<br>コメント</td>
//   <td>リクエスト送信</td>
//   </tr>