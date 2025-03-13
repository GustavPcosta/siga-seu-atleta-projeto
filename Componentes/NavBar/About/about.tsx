import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



export default function About(){
    return(
       <Dialog>
        <DialogTrigger>
            Sobre
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Sobre o projeto
                </DialogTitle>
                <DialogDescription>
                    <p>Este projeto foi criado com o intuito de aprender e melhorar minhas habilidades</p>

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
       </Dialog>
    )
}