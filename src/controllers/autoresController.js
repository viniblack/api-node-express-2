import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - Erro interno no servidor` });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).json(autorResultado);
      } else {
        res.status(404).json({ message: "Id do Autor não localizado." });
      }
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).json({ message: "Dados fornecidos estão incorretos" });
      } else {
        res.status(500).json({ message: "Erro interno de servidor" });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).json(autor.toJSON());
    } catch (err) {
      res
        .status(500)
        .json({ message: `Falha ao cadastrar Autor - ${err.message}` });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ message: `Erro no servidor ${err.message}` });
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor removido com sucesso" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default AutorController;
