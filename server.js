const grpc = require('grpc')
const notesProto = grpc.load('notes.proto')

const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'},
    { id: '2', title: 'Note 2', content: 'Content 5'},
    { id: '2', title: 'Note 2', content: 'Content 10'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
]
const server = new grpc.Server()

server.addService(notesProto.NoteService.service, {
    list :(_,callback) => {
        callback(null,notes)
    },
    insert : (call,callback) => {
        let note = call.request
        console.log(note)
        
        notes.push(note)
        callback(null,note)
    }
})



server.bind('127.0.0.1:50051',grpc.ServerCredentials.createInsecure())
server.start()
console.log(`the server is running`)
