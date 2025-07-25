import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';
import path from 'path';
import fs from 'fs';

class FilesController {
    async create(request, response) {

        console.log(request.file);
        // Você pode salvar o caminho do arquivo no banco de dados, por exemplo:
        const filePath = request.file.path;

        console.log(filePath);

        response.json({ message: 'Upload realizado com sucesso', path: request.file });
    }

    async delete(request, response) {

        console.log(request.params.filename)

        const filename = request.params.filename;
        const filePath = path.join(process.env.CAMINHOFILES, 'gestao', filename);

        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Erro ao excluir arquivo', err);

                    response.status(500).json({ error: 'Erro ao excluir arquivo' });
                } else {


                    console.log('Arquivo excluído com sucesso');
                    response.status(200).json({ message: 'Arquivo excluído com sucesso' });
                }
            });
        } else {
            console.error('Arquivo não encontrado');
            response.status(404).json({ error: 'Arquivo não encontrado' });
        }
    }

    async show(request, response) {

        const { fileName } = request.params;

        const filePath = path.resolve(process.env.CAMINHOFILES, 'gestao', fileName);

        if (fs.existsSync(filePath)) {
            const fileName = path.basename(filePath);
            return response.download(filePath, fileName, (err) => {
                if (err) {
                    console.error('Erro no download:', err);
                    response.status(500).json({ error: 'Erro ao baixar o arquivo' });
                }
            });
        } else {
            return response.status(404).json({ error: 'Arquivo não encontrado' });
        }

    }

}

export default new FilesController();

