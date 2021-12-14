{  OpenReply && 
    <form style = {{ display: 'flex'}}  /*</div>={onSubmit}*/  >
        <Input
            style={{ width: '100%', borderRadius: '5px'}}
            onChange ={ handleChange}
            value={CommentValue}
            placeholder=" Write your Comment"
            />
         <br/>
         <Button style={{width: '20%',height: '52px'}}  onClick={onSubmit}>Submit</Button>
        

   </form>
   }
   