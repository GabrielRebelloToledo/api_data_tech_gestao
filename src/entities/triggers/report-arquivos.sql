DELIMITER $$

CREATE TRIGGER trg_report_arquivos_before_update
BEFORE UPDATE ON report_arquivos
FOR EACH ROW
BEGIN
  IF NEW.mestre = 1 AND (OLD.mestre != 1 OR OLD.idCabReport != NEW.idCabReport) THEN
    IF EXISTS (
      SELECT 1
      FROM report_arquivos
      WHERE idCabReport = NEW.idCabReport
        AND mestre = 1
        AND id != NEW.id -- evite se atualizar o próprio registro
    ) THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Já existe um mestre para esse Relatório';
    END IF;
  END IF;
END$$

DELIMITER ;
