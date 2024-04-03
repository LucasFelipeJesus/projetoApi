import { Request, Response } from "express";
import Phone from "../../models/phone.entity";


export default class PhoneController {
    static async store(req: Request, res: Response) {
        const { number } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(400).json({ error: 'Usuário não autenticado' })
        if (!number) return res.status(400).json({ error: 'Número não encontrado' })

        const phone = new Phone()
        phone.number = number
        phone.userId = Number(userId)
        await phone.save()
        return res.status(201).json(phone)
    }
    static async index(req: Request, res: Response) {
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado!' })

        const phones = await Phone.find({ where: { userId: Number(userId) } })

        return res.status(200).json(phones)
    }
    static async show(req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado!' })
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const phone = await Phone.findOneBy({ id: Number(id), userId: Number(userId) })
        if (!phone) {
            return res.status(404).json({ erro: 'Número não encontrado' })
        }
        return res.json(phone)
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        const phone = await Phone.findOneBy({ id: Number(id), userId: Number(userId) })

        if (!phone) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        phone.remove()
        return res.status(204).json()
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { number } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado!' })

        if (!number) {
            return res.status(400).json({ erro: 'Titulo é obrigatório!' })
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const phone = await Phone.findOneBy({ id: Number(id), userId: Number(userId) })

        if (!phone) {
            return res.status(404).json({ error: 'Não encontrado' })
        }

        phone.number = number ?? phone.number // ?? verifica se é nulo 
        await phone.save()
        return res.json(phone)
    }


}