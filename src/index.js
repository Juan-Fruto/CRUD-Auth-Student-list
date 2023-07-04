import app from './app';
import './dbConection';

// server is listening

app.listen(app.get('port'), function(){
    console.log('server on port', app.get('port'));
});

