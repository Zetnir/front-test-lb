import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../../app/models/RouteParams';
import { Stats, StatsByProvinces } from '../../../../app/models/Stats';
import { ExtractCumulativeStats } from '../../../../app/services/StatsExtraction';
import { ProvinceMapData, PROVINCES_MAP_DATA } from '../../../constants';

/**
 * Populate the canada map with some additionnal details
 */
enum SVGElementType {
  TEXT = 'text',
  VALUE = 'value',
  LINE = 'line',
}

export const useCustomMapData = (statsMap: StatsByProvinces) => {
  const { dataSet } = useParams<RouteParams>();

  useEffect(() => {
    const createSVGElementByType = (
      province: ProvinceMapData,
      svgElementType: SVGElementType
    ) => {
      const previousChild = document.getElementById(
        province.code + '-' + svgElementType
      );
      if (previousChild) {
        document.getElementById(province.code)?.removeChild(previousChild);
      }
      const child = document.createElementNS(
        'http://www.w3.org/2000/svg',
        svgElementType === SVGElementType.VALUE ? 'text' : svgElementType
      );
      child.id = province.code + '-' + svgElementType;
      child.setAttribute('pointer-events', 'none');
      child.setAttribute('pointer-events', 'none');

      switch (svgElementType) {
        case SVGElementType.VALUE:
          child.setAttribute('x', province.value.x);
          child.setAttribute('y', province.value.y);
          child.setAttribute('font-size', province.value.fontSize);
          child.setAttribute('font-weight', province.value.fontWeight);
          child.setAttribute('text-anchor', province.value.textAnchor);
          child.setAttribute('fill', province.fill);
          child.textContent = ExtractCumulativeStats(
            statsMap.get(province.code) ?? ({} as Stats),
            dataSet
          ).toString();
          break;
        case SVGElementType.LINE:
          if (province.line) {
            child.setAttribute('x1', province.line.x1);
            child.setAttribute('x2', province.line.x2);
            child.setAttribute('y1', province.line.y1);
            child.setAttribute('y2', province.line.y2);
            child.setAttribute('style', province.line.style);
          }
          break;
        case SVGElementType.TEXT:
        default:
          child.setAttribute('x', province.text.x);
          child.setAttribute('y', province.text.y);
          child.setAttribute('font-size', province.text.fontSize);
          child.setAttribute('font-weight', province.text.fontWeight);
          child.setAttribute('text-anchor', province.text.textAnchor);
          child.setAttribute('fill', province.fill);
          child.textContent = province.code;

          break;
      }

      document.getElementById(province.code)?.appendChild(child);
    };

    const data = PROVINCES_MAP_DATA;
    data.forEach((province) => {
      createSVGElementByType(province, SVGElementType.TEXT);
      createSVGElementByType(province, SVGElementType.VALUE);
      if (province.line) {
        createSVGElementByType(province, SVGElementType.LINE);
      }
    });
  }, [dataSet, statsMap]);
};
